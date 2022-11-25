package controller

import (
	"encoding/json"
	"hackathon/model"
	"hackathon/usecase"
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter) {
	users, ServerErr := usecase.GetUsers()
	if ServerErr != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	bytes, ServerErr := json.Marshal(users)
	if ServerErr != nil {
		log.Printf("fail: json.Marshal, %v\n", ServerErr)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(bytes)
	return
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	switch r.Method {
	case http.MethodGet:
		GetUsers(w)
		w.WriteHeader(http.StatusOK)
		return

	case http.MethodPut:
		var user model.User
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
		GetUsers(w)
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
