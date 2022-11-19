package controller

import (
	"encoding/json"
	"hackathon/model"
	"hackathon/usecase"
	"log"
	"net/http"
)

func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	switch r.Method {
	case http.MethodGet:
		GetUsers(w)

	case http.MethodPost:
		var user model.User
		RequestErr := json.NewDecoder(r.Body).Decode(&user)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		RequestErr, ServerErr := usecase.RegisterUser(&user)
		if RequestErr != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		if ServerErr != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		GetUsers(w)

	case http.MethodOptions:
		return
	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
