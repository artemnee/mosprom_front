package dto

type PaginationResponse struct {
	Count  int64 `json:"count"`
	Offset int   `json:"offset"`
	Limit  int   `json:"limit"`
	Result any   `json:"result"`
}
