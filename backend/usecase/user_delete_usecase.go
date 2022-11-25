package usecase

import "hackathon/dao"

func DeleteUser(UserId string) error {
	ServerErr := dao.DeleteUser(UserId)
	return ServerErr
}
