package usecase

import (
	"hackathon/dao"
	"hackathon/model"
)

func UpdateCon(con model.Con) error {
	ServerErr := dao.UpdateCon(con)
	return ServerErr
}
