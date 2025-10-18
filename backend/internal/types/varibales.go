package types

type Role int

const (
	Owner Role = iota
	Admin
	Member
	Guest
)

func (r Role) String() string {
	switch r {
	case Owner:
		return "Owner"
	case Admin:
		return "Admin"
	case Member:
		return "Member"
	case Guest:
		return "Guest"
	default:
		return "No role"
	}
}
