package usecase

import (
	"errors"
	"github.com/oklog/ulid/v2"
	"hackathon/dao"
	"hackathon/model"
	"unicode/utf8"
)

func RegisterUser(user *model.User) (error, error) {
	user.UserId = ulid.Make().String()

	if user.LastName == "" || utf8.RuneCountInString(user.LastName) > 25 {
		RequestErr := errors.New("fail: lastname is invalid")
		return RequestErr, nil
	}
	if user.FirstName == "" || utf8.RuneCountInString(user.FirstName) > 25 {
		RequestErr := errors.New("fail: firstname is invalid")
		return RequestErr, nil
	}
	ServerErr := dao.RegisterUser(*user)
	return nil, ServerErr
}
