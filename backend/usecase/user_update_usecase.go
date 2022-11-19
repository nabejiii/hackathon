package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func UpdateUser(user model.User) error {
	ServerErr := dao.UpdateUser(user)
	return ServerErr
}
