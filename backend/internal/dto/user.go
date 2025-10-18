package dto

type UserReq struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type UserResp struct {
	AccessToken string `json:"access_token"`
}
