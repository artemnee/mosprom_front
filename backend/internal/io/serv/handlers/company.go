package handlers

import (
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/dto"
	"github.com/gofiber/fiber/v2"
)

func (cr *Controller) CreateCompany(c *fiber.Ctx) error {
	user := GetAuthContext(c).User

	var req dto.CompanyReq
	if err := c.BodyParser(&req); err != nil {
		return api_error.CompanyBadRequest.Resp(c)
	}

	create, err := cr.bl.Company.Create(req, user)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(create)
}

func (cr *Controller) GetCompanyList(c *fiber.Ctx) error {
	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)

	return c.Status(fiber.StatusOK).JSON(cr.bl.Company.GetList(limit, offset))
}
