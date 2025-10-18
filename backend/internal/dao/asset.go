package dao

import (
	"github.com/google/uuid"
	"time"
)

type FileAsset struct {
	Id          uuid.UUID     `gorm:"type:uuid;primary_key" json:"id"`
	CreatedAt   time.Time     `json:"created_at"`
	CreatedById uuid.NullUUID `json:"created_by,omitempty" extensions:"x-nullable"`

	CompanyId uuid.NullUUID `json:"company_id,omitempty"`

	Name        string `json:"name" gorm:"index"`
	FileSize    int    `json:"size"`
	ContentType string `json:"content_type"`

	Company *Company `json:"-" gorm:"foreignKey:CompanyId" extensions:"x-nullable"`
	Author  *User    `json:"-" gorm:"foreignKey:CreatedById" extensions:"x-nullable"`
}

func (f FileAsset) TableName() string {
	return "file_asset"
}
