package dao

import (
	"hackathon/model"
	"log"
)

func GetPointSum(UserId string) (int, error) {
	var p int
	err := db.QueryRow("SELECT SUM(point) FROM contributions WHERE receiver_id = ?", UserId).Scan(&p)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return 0, err
	}
	return p, nil
}

func GetReceivedCons(UserId string) ([]model.ReceivedCon, error) {
	rows, err := db.Query("SELECT con_id, time, sender_id, point, message FROM contributions WHERE receiver_id = ?", UserId)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return nil, nil
	}
	ReceivedCons := make([]model.ReceivedCon, 0)
	for rows.Next() {
		var rc model.ReceivedCon
		if err := rows.Scan(&rc.ConId, &rc.Time, &rc.SenderId, &rc.Point, &rc.Message); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}
		ReceivedCons = append(ReceivedCons, rc)
	}
	return ReceivedCons, err
}

func GetSentCons(UserId string) ([]model.SentCon, error) {
	rows, err := db.Query("SELECT con_id, time, receiver_id, point, message FROM contributions WHERE sender_id = ?", UserId)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return nil, err
	}
	SentCons := make([]model.SentCon, 0)
	for rows.Next() {
		var sc model.SentCon
		if err := rows.Scan(&sc.ConId, &sc.Time, &sc.ReceiverId, &sc.Point, &sc.Message); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}
		SentCons = append(SentCons, sc)
	}
	return SentCons, err
}
