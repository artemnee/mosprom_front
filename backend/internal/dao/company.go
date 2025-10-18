package dao

import (
	t "ed-platform/internal/types"
	"github.com/google/uuid"
	"time"
)

type Company struct {
	Id uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	Name        string        `json:"name"`
	Description string        `json:"description"`
	LogoId      uuid.NullUUID `json:"logo"`

	CreatedById uuid.UUID `json:"created_by_id" gorm:"type:uuid"`

	Author    *User      `json:"author,omitempty" gorm:"foreignKey:CreatedById" extensions:"x-nullable"`
	LogoAsset *FileAsset `json:"logo_details" gorm:"foreignKey:LogoId" extensions:"x-nullable"`

	IsActive bool `json:"is_active"`
}

func (c Company) TableName() string {
	return "company"
}

type CompanyMember struct {
	Id        uuid.UUID `gorm:"type:uuid;primary_key" json:"id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`

	MemberId  uuid.UUID `gorm:"type:uuid" json:"member_id"`
	CompanyId uuid.UUID `gorm:"type:uuid" json:"company_id"`

	Role t.Role `json:"role"`
}

func (c CompanyMember) TableName() string {
	return "company_member"
}
