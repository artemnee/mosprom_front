package handlers

import (
	api_error "ed-platform/internal/api-error"
	"ed-platform/internal/dao"
	"ed-platform/internal/dto"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
)

type CommunityContext struct {
	*fiber.Ctx
	Community *dao.Community
}

func NewCommunityContext(c *fiber.Ctx) *CommunityContext {
	return &CommunityContext{
		Ctx:       c,
		Community: nil,
	}
}

func GetCommunityContext(c *fiber.Ctx) *CommunityContext {
	communityCtx, ok := c.Locals("communityContext").(*CommunityContext)
	if !ok {
		return NewCommunityContext(c)
	}
	return communityCtx
}

func (cr *Controller) CommunityMiddleware() fiber.Handler {
	return func(c *fiber.Ctx) error {
		communityCtx := NewCommunityContext(c)
		company := GetCompanyContext(c).Company
		id := c.Params("communityId")
		parse, err := uuid.Parse(id)
		if err != nil {
			return api_error.CommunityNotFound.Resp(c)
		}

		get, err := cr.bl.Community.GetById(parse, company.Id)
		if err != nil {
			return api_error.EError(err, c)
		}

		communityCtx.Community = get
		c.Locals("communityContext", communityCtx)

		return c.Next()
	}
}

func (cr *Controller) CreateCommunity(c *fiber.Ctx) error {
	user := GetAuthContext(c).User
	communityId := GetCompanyContext(c).Company.Id

	var req dto.CommunityReq
	if err := c.BodyParser(&req); err != nil {
		return api_error.CommunityBadRequest.Resp(c)
	}

	create, err := cr.bl.Community.Create(req, communityId, user)
	if err != nil {
		return err
	}

	return c.Status(fiber.StatusCreated).JSON(create)
}

func (cr *Controller) GetCommunityList(c *fiber.Ctx) error {
	limit := c.QueryInt("limit", 10)
	offset := c.QueryInt("offset", 0)
	companyId := GetCompanyContext(c).Company.Id

	return c.Status(fiber.StatusOK).JSON(cr.bl.Community.GetList(limit, offset, companyId))
}

func (cr *Controller) GetCommunity(c *fiber.Ctx) error {
	community := GetCommunityContext(c).Community
	return c.Status(fiber.StatusOK).JSON(community)
}
