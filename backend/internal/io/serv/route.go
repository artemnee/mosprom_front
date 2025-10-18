package serv

func (h *Http) UserNoAuth() {
	user := h.app.Group("/api/user")

	//client.Get("/all/", io.controller.AllClient)
	user.Post("/", h.controller.CreateUser)
	user.Post("/login/", h.controller.UserLogin)
}

func (h *Http) Company() {
	company := h.app.Group("/api/auth/company")

	company.Post("/", h.controller.CreateCompany)
	company.Get("/", h.controller.GetCompanyList)
}
