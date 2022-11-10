package model

type ReceivedCon struct {
	ConId    string `json:"con_id"`
	Time     string `json:"time"`
	SenderId string `json:"sender_id"`
	Point    int    `json:"point"`
	Message  string `json:"message"`
}

type SentCon struct {
	ConId      string `json:"con_id"`
	Time       string `json:"time"`
	ReceiverId string `json:"receiver_id"`
	Point      int    `json:"point"`
	Message    string `json:"message"`
}

type ConsResForHTTPGet struct {
	Point        int           `json:"point"`
	ReceivedCons []ReceivedCon `json:"received_cons"`
	SentCons     []SentCon     `json:"sent_cons"`
}
