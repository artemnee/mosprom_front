package serv

func (h *Http) UserNoAuth() {
	user := h.apiGroup.Group("/user")
	user.Post("/", h.controller.CreateUser)
	user.Post("/login/", h.controller.UserLogin)
}

func (h *Http) Company() {
	h.authGroup.Post("/companies", h.controller.CreateCompany)
	h.authGroup.Get("/companies", h.controller.GetCompanyList)

	h.companyGroup.Get("/", h.controller.GetCompany)
}

func (h *Http) Community() {
	communities := h.companyGroup.Group("/communities")
	communities.Post("/", h.controller.CreateCommunity)
	communities.Get("/", h.controller.GetCommunityList)

	h.communityGroup.Get("/", h.controller.GetCommunity)
}
