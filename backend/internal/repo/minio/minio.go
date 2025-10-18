package minio_store

import (
	"context"
	"ed-platform/internal/config"
	i_repo "ed-platform/internal/repo/i-repo"
	"fmt"
	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
	"io"
	"time"

	"log/slog"
)

type store struct {
	client     *minio.Client
	bucketName string
}

const (
	UploadTries = 20
)

func New(cfg *config.Config) (i_repo.IStore, error) {
	client, err := minio.New(cfg.AWSEndpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(cfg.AWSAccessKey, cfg.AWSSecretKey, ""),
		Secure: false,
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create minio client: %v", err)
	}

	slog.Info("Store: Minio initialized")
	s := store{client: client, bucketName: cfg.AWSBucketName}

	err = s.createBucketIfNotExists(context.Background(), cfg.AWSBucketName)
	if err != nil {
		return nil, fmt.Errorf(fmt.Sprintf("Failed to create bucket %s: %v", cfg.AWSBucketName, err))
	}
	return &s, nil
}

func (s *store) createBucketIfNotExists(ctx context.Context, bucketName string) error {
	exists, err := s.client.BucketExists(ctx, bucketName)
	if err != nil {
		slog.Error("Failed to check bucket existence", "bucket", bucketName, "error", err)
		return err
	}

	if exists {
		slog.Info("Bucket already exists", "bucket", bucketName)
		return nil
	}

	err = s.client.MakeBucket(ctx, bucketName, minio.MakeBucketOptions{})
	if err != nil {
		slog.Error("Failed to create bucket", "bucket", bucketName, "error", err)
		return err
	}

	slog.Info("Bucket created successfully", "bucket", bucketName)
	return nil
}

func (s *store) SaveReader(reader io.Reader, fileSize int64, name uuid.UUID, contentType string) error {
	putOptions := minio.PutObjectOptions{ContentType: contentType}

	var err error
	for i := range UploadTries {
		_, err = s.client.PutObject(context.Background(),
			s.bucketName,
			name.String(),
			reader,
			fileSize,
			putOptions,
		)
		if err != nil {
			resp := minio.ToErrorResponse(err)
			slog.Error("Upload file to minio", "name", name, "try", i+1, "code", resp.StatusCode, "msg", resp.Message, "err", err)
			time.Sleep(time.Minute)
			continue
		}
		break
	}
	return err
}
