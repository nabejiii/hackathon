package usecase

import (
	"errors"
	"github.com/oklog/ulid/v2"
	"hackathon/dao"
	"hackathon/model"
	"time"
	"unicode/utf8"
)

func SendCon(con *model.Con, UserId string) (error, error) {
	con.Time = time.Now()
	con.ConId = ulid.Make().String()
	con.Sender.UserId = UserId
	if utf8.RuneCountInString(con.Message) > 100 {
		RequestErr := errors.New("fail: lastname is invalid")
		return RequestErr, nil
	}
	ServerErr := dao.SendCon(*con)
	return nil, ServerErr
}
