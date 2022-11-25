package controller

import (
	"encoding/json"
	"hackathon/model"
	"hackathon/usecase"
	"log"
	"net/http"
)

func GetSentCons(w http.ResponseWriter, UserId string) {
	SentCons, ServerErr := usecase.GetSentCons(UserId)
	if ServerErr != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	Response := model.SentConsResForHTTPGet{SentCons: SentCons}
	bytes, ServerErr := json.Marshal(Response)
	if ServerErr != nil {
		log.Printf("fail: json.Marshal, %v\n", ServerErr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
	return
}

func SendConHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	UserId := r.URL.Query().Get("user_id")
	if UserId == "" {
		log.Println("fail: user_id is empty")
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	switch r.Method {
	case http.MethodGet:
		GetSentCons(w, UserId)
		w.WriteHeader(http.StatusOK)
		return

	case http.MethodPost:
		var con model.Con
		RequestErr := json.NewDecoder(r.Body).Decode(&con)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		RequestErr, ServerErr := usecase.SendCon(&con, UserId)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if ServerErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		GetSentCons(w, UserId)
		w.WriteHeader(http.StatusOK)
		return

	case http.MethodPut:
		var con model.Con
		con.Receiver.UserId = UserId
		RequestErr := json.NewDecoder(r.Body).Decode(&con)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		ServerErr := usecase.UpdateCon(con)
		if ServerErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		GetSentCons(w, UserId)
		w.WriteHeader(http.StatusOK)
		return

	case http.MethodDelete:
		var con model.Con
		RequestErr := json.NewDecoder(r.Body).Decode(&con)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		ServerErr := usecase.DeleteCon(con.ConId)
		if ServerErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		GetSentCons(w, UserId)
		w.WriteHeader(http.StatusOK)
		return

	case http.MethodOptions:
		return
	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
