package serv

import (
	"ed-platform/internal/bl"
	"ed-platform/internal/config"
	"ed-platform/internal/io/serv/handlers"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"log/slog"
	"os"
)

type Http struct {
	app        *fiber.App
	cfg        *config.Config
	controller *handlers.Controller

	apiGroup       fiber.Router
	authGroup      fiber.Router
	companyGroup   fiber.Router
	communityGroup fiber.Router
}

func New(bl *bl.Bl) *Http {
	if bl == nil {
		return nil
	}
	fib := fiber.New()
	fib.Use(cors.New(cors.Config{
		AllowHeaders:     "Origin, Content-Type, Accept, Content-Length, Accept-Language, Accept-Encoding, Connection, Access-Control-Allow-Origin",
		AllowOrigins:     "*",
		AllowCredentials: false,
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	ctr := handlers.New(*bl)

	app := Http{
		app:        fib,
		cfg:        bl.Cfg,
		controller: ctr}

	app.apiGroup = app.app.Group("/api")
	app.authGroup = app.apiGroup.Group("/auth", ctr.AuthMiddleware())
	app.companyGroup = app.authGroup.Group("/companies/:companyId", ctr.CompanyMiddleware())
	app.communityGroup = app.companyGroup.Group("/communities/:communityId", ctr.CommunityMiddleware())

	app.UserNoAuth()
	app.Company()
	app.Community()

	return &app
}

func (h *Http) Run() {

	addr := fmt.Sprintf("%s:%s", h.cfg.AppServerURL, h.cfg.AppServerPort)
	go func() {
		if err := h.app.Listen(addr); err != nil {
			slog.Error("err: ", err)
			os.Exit(1)
		}
	}()
}

func (h *Http) Stop() {
	if err := h.app.Shutdown(); err != nil {
		slog.Error("Error while shutting down:", err)
	}
	slog.Info("Server gracefully stopped")
}
