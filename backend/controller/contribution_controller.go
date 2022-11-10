package controller

import (
	"encoding/json"
	"hackathon/dao"
	"hackathon/model"
	"hackathon/usecase"
	"log"
	"net/http"
)

func ContributionHandler(w http.ResponseWriter, r *http.Request) {
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
		point := dao.GetPointSum(w, UserId)
		ReceivedCons := usecase.GetReceivedCons(w, UserId)
		SentCons := usecase.GetSentCons(w, UserId)
		Response := model.ConsResForHTTPGet{Point: point, ReceivedCons: ReceivedCons, SentCons: SentCons}
		bytes, err := json.Marshal(Response)
		if err != nil {
			log.Printf("fail: json.Marshal, %v\n", err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(bytes)

	case http.MethodPost:

	case http.MethodOptions:
		return
	default:
		log.Printf("fail: HTTP Method is %s\n", r.Method)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
}
