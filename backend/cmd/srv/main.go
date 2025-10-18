package main

import (
	"ed-platform/internal/bl"
	"ed-platform/internal/config"
	"ed-platform/internal/io/serv"
	"ed-platform/internal/repo"
	"os"
	"os/signal"
	"syscall"
)

func main() {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	cfg := config.ReadConfig()

	srv := serv.New(bl.New(repo.New(cfg)))

	if srv != nil {
		srv.Run()
	} else {
		os.Exit(1)
	}

	<-stop
	srv.Stop()
}
