package model

import "time"

type Con struct {
	ConId    string    `json:"con_id"`
	Time     time.Time `json:"time"`
	Sender   User      `json:"sender"`
	Receiver User      `json:"receiver"`
	Point    int       `json:"point"`
	Message  string    `json:"message"`
}

type RecConsResForHTTPGet struct {
	Point        int   `json:"point"`
	ReceivedCons []Con `json:"received_cons"`
}

type SentConsResForHTTPGet struct {
	SentCons []Con `json:"sent_cons"`
}
