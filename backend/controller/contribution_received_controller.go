package controller

import (
	"encoding/json"
	"hackathon/model"
	"hackathon/usecase"
	"log"
	"net/http"
)

func GetRecCons(w http.ResponseWriter, UserId string) {
	point, ReceivedCons, ServerErr := usecase.GetRecCons(UserId)
	if ServerErr != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	Response := model.RecConsResForHTTPGet{Point: point, ReceivedCons: ReceivedCons}
	bytes, ServerErr := json.Marshal(Response)
	if ServerErr != nil {
		log.Printf("fail: json.Marshal, %v\n", ServerErr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
	w.WriteHeader(http.StatusOK)
	return
}

func RecConHandler(w http.ResponseWriter, r *http.Request) {
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
		GetRecCons(w, UserId)

	case http.MethodOptions:
		return
	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
