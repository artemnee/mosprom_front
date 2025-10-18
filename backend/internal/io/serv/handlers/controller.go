package handlers

import "ed-platform/internal/bl"

type Controller struct {
	bl bl.Bl
}

func New(bl bl.Bl) *Controller {
	return &Controller{bl: bl}
}
