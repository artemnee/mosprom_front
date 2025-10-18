package handlers

import (
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CompanyContext struct {
	*fiber.Ctx
	Company *dao.Company
}

func NewCompanyContext(c *fiber.Ctx) *CompanyContext {
	return &CompanyContext{
		Ctx:     c,
		Company: nil,
	}
}

func GetCompanyContext(c *fiber.Ctx) *CompanyContext {
	companyCtx, ok := c.Locals("companyContext").(*CompanyContext)
	if !ok {
		return NewCompanyContext(c)
	}
	return companyCtx
}

func (cr *Controller) CompanyMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		companyCtx := NewCompanyContext(c)
		companyID := c.Params("companyId")
		parse, err := uuid.Parse(companyID)
		if err != nil {
			return api_error.CompanyNotFound.Resp(c)
		}

		get, err := cr.bl.Company.Get(parse)
		if err != nil {
			return api_error.EError(err, c)
		}

		companyCtx.Company = get
		c.Locals("companyContext", companyCtx)

		return c.Next()
	}
}

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

func (cr *Controller) GetCompany(c *fiber.Ctx) error {
	company := GetCompanyContext(c).Company
	return c.Status(fiber.StatusOK).JSON(company)
}
