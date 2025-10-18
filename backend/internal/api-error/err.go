package api_error

import (
	"github.com/gofiber/fiber/v2"
	"log/slog"
	"net/http"
)

type Err struct {
	Status  int    `json:"status"`
	Message string `json:"message"`
}

var (
	UserBadRequest  = Err{Status: http.StatusBadRequest, Message: "user bad request"}
	UserNotFound    = Err{Status: http.StatusNotFound, Message: "user not found"}
	UserFailedLogin = Err{Status: http.StatusUnauthorized, Message: "invalid credentials"}

	ErrUnauthorized = Err{Status: http.StatusUnauthorized, Message: "unauthorized"}

	CompanyNotFound   = Err{Status: http.StatusNotFound, Message: "company not found"}
	CommunityNotFound = Err{Status: http.StatusNotFound, Message: "community not found"}

	CompanyBadRequest   = Err{Status: http.StatusBadRequest, Message: "company bad request"}
	CommunityBadRequest = Err{Status: http.StatusBadRequest, Message: "community bad request"}

	DefaultError = Err{Status: http.StatusBadRequest, Message: "some error"}
)

func (e *Err) Resp(c *fiber.Ctx) error {
	return c.Status(e.Status).JSON(e)
}

func (e *Err) Error() string {
	return e.Message
}

func EError(e error, ctx *fiber.Ctx) error {
	switch e.(type) {
	case *Err:
		return e.(*Err).Resp(ctx)
	default:
		slog.Error("EError", "msg", e.Error())
		return DefaultError.Resp(ctx)
	}
}
