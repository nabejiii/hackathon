package dao

import (
	_ "github.com/go-sql-driver/mysql"
	"hackathon/model"
	"log"
	"time"
)

func GetUsers() ([]model.User, error) {
	rows, ServerErr := db.Query("SELECT user_id, first_name, last_name FROM users")
	if ServerErr != nil {
		log.Printf("fail: db.Query, %v\n", ServerErr)
		return nil, ServerErr
	}
	users := make([]model.User, 0)
	for rows.Next() {
		var u model.User
		if err := rows.Scan(&u.UserId, &u.FirstName, &u.LastName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil {
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}
		users = append(users, u)
	}
	return users, ServerErr
}

func RegisterUser(user model.User) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("INSERT INTO users(user_id, first_name, last_name) VALUES (?, ?, ?)", user.UserId, user.FirstName, user.LastName)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}

func UpdateUser(user model.User) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("UPDATE users SET first_name = ?, last_name = ? WHERE user_id = ?", user.FirstName, user.LastName, user.UserId)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}

func GetUserInfo(UserId string) (model.User, error) {
	var user model.User
	user.UserId = UserId
	err := db.QueryRow("SELECT first_name, last_name FROM users WHERE user_id = ?", UserId).Scan(&user.FirstName, &user.LastName)
	if err != nil {
		log.Printf("fail: db.Query, %v\n", err)
		return model.User{}, nil
	}
	return user, err
}

func GetMembers(day time.Time) ([]model.Member, error) {
	rows, ServerErr := db.Query("SELECT user_id, first_name, last_name FROM users")
	if ServerErr != nil {
		log.Printf("fail: db.Query, %v\n", ServerErr)
		return nil, ServerErr
	}
	members := make([]model.Member, 0)
	for rows.Next() {
		var m model.Member
		if err := rows.Scan(&m.UserId, &m.FirstName, &m.LastName); err != nil {
			log.Printf("fail: rows.Scan, %v\n", err)

			if err := rows.Close(); err != nil {
				log.Printf("fail: rows.Close(), %v\n", err)
			}
			return nil, err
		}
		err := db.QueryRow("SELECT SUM(point) FROM contributions WHERE receiver_id = ?", m.UserId).Scan(&m.TotalPoint)
		if err != nil {
			m.TotalPoint = 0
		}
		err = db.QueryRow("SELECT SUM(point) FROM contributions WHERE receiver_id = ? AND time > ?", m.UserId, day).Scan(&m.WeekPoint)
		if err != nil {
			m.WeekPoint = 0
		}
		members = append(members, m)
	}
	return members, ServerErr
}

func DeleteUser(UserId string) error {
	tx, err := db.Begin()
	if err != nil {
		log.Printf("fail: db.Begin, %v\n", err)
		return err
	}
	_, err = db.Query("DELETE FROM users WHERE user_id = ?", UserId)
	if err != nil {
		tx.Rollback()
		log.Printf("fail: db.Query, %v\n", err)
		return err
	} else {
		tx.Commit()
	}
	return err
}
