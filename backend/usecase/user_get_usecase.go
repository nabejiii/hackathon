package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func GetUsers() ([]model.User, error) {
	users, ServerErr := dao.GetUsers()
	return users, ServerErr
}

func GetUserInfo(UserId string) (model.User, error) {
	var ServerErr error
	var user model.User
	user, ServerErr = dao.GetUserInfo(UserId)
	return user, ServerErr
}
