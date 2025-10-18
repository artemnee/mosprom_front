package handlers

import (
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	t "ed-platform/internal/types"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"strings"
)

type AuthContext struct {
	*fiber.Ctx
	User        *dao.User
	AccessToken *t.Token
	TokenAuth   bool
}

func NewAuthContext(c *fiber.Ctx) *AuthContext {
	return &AuthContext{
		Ctx:       c,
		TokenAuth: false,
	}
}

func GetAuthContext(c *fiber.Ctx) *AuthContext {
	authCtx, ok := c.Locals("authContext").(*AuthContext)
	if !ok {
		return NewAuthContext(c)
	}
	return authCtx
}

func (cr *Controller) AuthMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		authCtx := NewAuthContext(c)

		authHeader := c.Get("Authorization")
		if authHeader == "" {
			return api_error.ErrUnauthorized.Resp(c)
		}

		parts := strings.Split(authHeader, " ")
		if len(parts) != 2 || parts[0] != "Bearer" {
			c.Locals("authContext", authCtx)
			return api_error.ErrUnauthorized.Resp(c)
		}

		tokenString := parts[1]
		if tokenString == "" {
			c.Locals("authContext", authCtx)
			return api_error.ErrUnauthorized.
				Resp(c)
		}

		token, err := cr.bl.User.CheckAuth(tokenString)
		if err != nil || token == nil {
			return api_error.ErrUnauthorized.Resp(c)
		}

		claims, ok := token.JWT.Claims.(jwt.MapClaims)
		if !ok || !token.JWT.Valid {
			return api_error.ErrUnauthorized.Resp(c)
		}

		id := claims["user_id"].(string)

		user, err := cr.bl.User.GetUser(id)
		if err != nil || user == nil {
			c.Locals("authContext", authCtx)
			return api_error.ErrUnauthorized.Resp(c)
		}

		authCtx.User = user
		authCtx.TokenAuth = true

		c.Locals("authContext", authCtx)

		return c.Next()
	}
}

func (cr *Controller) CreateUser(c *fiber.Ctx) error {
	var user dto.UserReq

	if err := c.BodyParser(&user); err != nil {
		return api_error.UserBadRequest.Resp(c)
	}

	err := cr.bl.User.Create(user)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(user)
}

func (cr *Controller) UserLogin(c *fiber.Ctx) error {
	var user dto.UserReq

	if err := c.BodyParser(&user); err != nil {
		return api_error.UserBadRequest.Resp(c)
	}
	token, err := cr.bl.User.Login(user)
	if err != nil {
		return api_error.EError(err, c)
	}

	resp := dto.UserResp{
		AccessToken: token,
	}

	return c.Status(fiber.StatusOK).JSON(resp)
}
