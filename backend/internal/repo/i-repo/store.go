package i_repo

import (
	"github.com/google/uuid"
	"io"
)

type IStore interface {
	SaveReader(reader io.Reader, fileSize int64, name uuid.UUID, contentType string) error
}
