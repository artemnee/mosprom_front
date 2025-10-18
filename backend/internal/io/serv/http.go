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

	api := fib.Group("/api")
	auth := api.Group("/auth", ctr.AuthMiddleware())
	auth.Get("/eee/", func(c *fiber.Ctx) error { return nil })
	app := Http{
		app:        fib,
		cfg:        bl.Cfg,
		controller: ctr}

	app.UserNoAuth()
	app.Company()

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
