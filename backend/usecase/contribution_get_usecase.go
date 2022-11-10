package usecase

import (
	"hackathon/dao"
	"hackathon/model"
	"log"
	"net/http"
)

func GetReceivedCons(w http.ResponseWriter, UserId string) []model.ReceivedCon {
	rows := dao.GetReceivedCons(w, UserId)
	ReceivedCons := make([]model.ReceivedCon, 0)
	for rows.Next() {
		var rc model.ReceivedCon
		if err := rows.Scan(&rc.ConId, &rc.Time, &rc.SenderId, &rc.Point, &rc.Message); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			w.WriteHeader(http.StatusInternalServerError)
			return nil
		}
		ReceivedCons = append(ReceivedCons, rc)
	}
	return ReceivedCons
}

func GetSentCons(w http.ResponseWriter, UserId string) []model.SentCon {
	rows := dao.GetSentCons(w, UserId)
	SentCons := make([]model.SentCon, 0)
	for rows.Next() {
		var sc model.SentCon
		if err := rows.Scan(&sc.ConId, &sc.Time, &sc.ReceiverId, &sc.Point, &sc.Message); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			w.WriteHeader(http.StatusInternalServerError)
			return nil
		}
		SentCons = append(SentCons, sc)
	}
	return SentCons
}
