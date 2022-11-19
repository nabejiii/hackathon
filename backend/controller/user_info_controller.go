package controller

import (
	"encoding/json"
	"hackathon/model"
	"hackathon/usecase"
	"log"
	"net/http"
)

func GetUserInfo(w http.ResponseWriter, UserId string) {
	user, err := usecase.GetUserInfo(UserId)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	bytes, ServerErr := json.Marshal(user)
	if ServerErr != nil {
		log.Printf("fail: json.Marshal, %v\n", ServerErr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
	w.WriteHeader(http.StatusOK)
}

func UserInfoHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	switch r.Method {
	case http.MethodGet:
		UserId := r.URL.Query().Get("user_id")
		if UserId == "" {
			log.Println("fail: user_id is empty")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		GetUserInfo(w, UserId)

	case http.MethodPut:
		var user model.User
		user.UserId = r.URL.Query().Get("user_id")
		if user.UserId == "" {
			log.Println("fail: user_id is empty")
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		RequestErr := json.NewDecoder(r.Body).Decode(&user)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		ServerErr := usecase.UpdateUser(user)
		if ServerErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		GetUserInfo(w, user.UserId)

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
