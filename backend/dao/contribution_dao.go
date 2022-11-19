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
	return p, err
}

func GetReceivedCons(UserId string) ([]model.Con, error) {
	rows, err := db.Query("SELECT con_id, time, sender_id, point, message FROM contributions WHERE receiver_id = ?", UserId)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return nil, err
	}
	ReceivedCons := make([]model.Con, 0)
	for rows.Next() {
		var rc model.Con
		if err := rows.Scan(&rc.ConId, &rc.Time, &rc.Sender.UserId, &rc.Point, &rc.Message); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)
			if err := rows.Close(); err != nil {
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}
		row, err := db.Query("SELECT first_name, last_name FROM users WHERE user_id = ?", rc.Sender.UserId)
		if err != nil {
			log.Printf("fail: db.Query, %v\n", err)
			return nil, err
		}
		for row.Next() {
			if err := row.Scan(&rc.Sender.FirstName, &rc.Sender.LastName); err != nil {
				log.Printf("fail: row.Scan, %v\n", err)
				if err := row.Close(); err != nil {
					log.Printf("fail: row.Close(), %v\n", err)
				}
				return nil, err
			}
		}
		ReceivedCons = append(ReceivedCons, rc)
	}
	return ReceivedCons, err
}

func GetSentCons(UserId string) ([]model.Con, error) {
	rows, err := db.Query("SELECT con_id, time, receiver_id, point, message FROM contributions WHERE sender_id = ?", UserId)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return nil, err
	}
	SentCons := make([]model.Con, 0)
	for rows.Next() {
		var sc model.Con
		if err := rows.Scan(&sc.ConId, &sc.Time, &sc.Receiver.UserId, &sc.Point, &sc.Message); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil {
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}

		row, err := db.Query("SELECT first_name, last_name FROM users WHERE user_id = ?", sc.Receiver.UserId)
		if err != nil {
			log.Printf("fail: db.Query, %v\n", err)
			return nil, err
		}
		for row.Next() {
			if err := row.Scan(&sc.Receiver.FirstName, &sc.Receiver.LastName); err != nil {
				log.Printf("fail: row.Scan, %v\n", err)

				if err := row.Close(); err != nil {
					log.Printf("fail: row.Close(), %v\n", err)
				}
				return nil, err
			}
		}
		SentCons = append(SentCons, sc)
	}
	return SentCons, err
}

func UpdateCon(con model.Con) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("UPDATE contributions SET point = ?, message = ? WHERE con_id = ? AND sender_id = ?", con.Point, con.Message, con.ConId, con.Sender.UserId)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}

func DeleteCon(ConId string) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("DELETE FROM contributions WHERE con_id = ?", ConId)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}
