package controller

import (
	"encoding/json"
	"hackathon/usecase"
	"log"
	"net/http"
)

func MembersHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Headers", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	switch r.Method {
	case http.MethodGet:
		members, err := usecase.GetMembers()
		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			return
		}

		bytes, ServerErr := json.Marshal(members)
		if ServerErr != nil {
			log.Printf("fail: json.Marshal, %v\n", ServerErr)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(bytes)
		w.WriteHeader(http.StatusOK)
		return

	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}