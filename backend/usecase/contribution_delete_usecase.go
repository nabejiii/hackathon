package usecase

import (
	"hackathon/dao"
)

func DeleteCon(ConId string) error {
	ServerErr := dao.DeleteCon(ConId)
	return ServerErr
}
