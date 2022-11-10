package dao

import (
	"database/sql"
	"log"
	"net/http"
)

func GetPointSum(w http.ResponseWriter, UserId string) int {
	var p int
	err := db.QueryRow("SELECT SUM(point) FROM contirbutions WHERE user_id = ?", UserId).Scan(&p)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return 0
	}
	return p
}

func GetReceivedCons(w http.ResponseWriter, UserId string) *sql.Rows {
	rows, err := db.Query("SELECT con_id, time, sender_id, point, message FROM contributions WHERE receiver_id = ?", UserId)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return nil
	}
	return rows
}

func GetSentCons(w http.ResponseWriter, UserId string) *sql.Rows {
	rows, err := db.Query("SELECT con_id, time, receiver_id, point, message FROM contributions WHERE sender_id = ?", UserId)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		w.WriteHeader(http.StatusInternalServerError)
		return nil
	}
	return rows
}
