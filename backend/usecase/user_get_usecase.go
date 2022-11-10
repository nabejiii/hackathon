package usecase

import (
	"hackathon/dao"
	"hackathon/model"
	"log"
	"net/http"
)

func GetUsers(w http.ResponseWriter) []model.User {
	rows := dao.GetUsers(w)
	users := make([]model.User, 0)
	for rows.Next() {
		var u model.User
		if err := rows.Scan(&u.UserId, &u.FirstName, &u.LastName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil { // 500を返して終了するが、その前にrowsのClose処理が必要
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			w.WriteHeader(http.StatusInternalServerError)
			return nil
		}
		users = append(users, u)
	}
	return users
}
