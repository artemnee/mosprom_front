package elastic_repo

import (
	"context"
	"ed-platform/internal/config"
	i_repo "ed-platform/internal/repo/i-repo"
	"encoding/json"
	"fmt"
	"log/slog"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/elastic/go-elasticsearch/v8/typedapi/types"
)

type elasticRepo struct {
	client *elasticsearch.TypedClient
}

func New(cfg *config.Config) (i_repo.IdbDoc, error) {
	esCfg := elasticsearch.Config{
		Addresses: []string{cfg.ElasticsearchURL},
		Username:  cfg.ElasticsearchUsername,
		Password:  cfg.ElasticsearchPassword,
	}

	client, err := elasticsearch.NewTypedClient(esCfg)
	if err != nil {
		return nil, fmt.Errorf("failed to create Elasticsearch client: %w", err)
	}

	_, err = client.Ping().Do(context.Background())
	if err != nil {
		return nil, fmt.Errorf("failed to connect to Elasticsearch: %w", err)
	}

	slog.Info("Elasticsearch repository initialized successfully")
	return &elasticRepo{client: client}, nil
}

func (e *elasticRepo) CreateIndex(ctx context.Context, indexName string) error {
	exists, err := e.client.Indices.Exists(indexName).Do(ctx)
	if err != nil {
		return fmt.Errorf("failed to check index existence: %w", err)
	}

	if exists {
		slog.Debug("Index already exists", "index", indexName)
		return nil
	}

	_, err = e.client.Indices.Create(indexName).Do(ctx)
	if err != nil {
		return fmt.Errorf("failed to create index: %w", err)
	}

	slog.Info("Index created successfully", "index", indexName)
	return nil
}

func (e *elasticRepo) IndexDocument(ctx context.Context, indexName string, documentID string, document interface{}) error {
	_, err := e.client.Index(indexName).
		Id(documentID).
		Request(document).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to index document: %w", err)
	}

	slog.Debug("Document indexed successfully", "index", indexName, "id", documentID)
	return nil
}

func (e *elasticRepo) SearchDocuments(ctx context.Context, indexName string, query map[string]interface{}) ([]interface{}, error) {
	queryJSON, err := json.Marshal(query)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal query: %w", err)
	}

	var searchQuery types.Query
	if err := json.Unmarshal(queryJSON, &searchQuery); err != nil {
		return nil, fmt.Errorf("failed to unmarshal query: %w", err)
	}

	resp, err := e.client.Search().
		Index(indexName).
		Query(&searchQuery).
		Do(ctx)

	if err != nil {
		return nil, fmt.Errorf("failed to search documents: %w", err)
	}

	var results []interface{}
	for _, hit := range resp.Hits.Hits {
		var source map[string]interface{}
		if err := json.Unmarshal(hit.Source_, &source); err != nil {
			return nil, fmt.Errorf("failed to unmarshal document: %w", err)
		}
		results = append(results, source)
	}

	return results, nil
}

func (e *elasticRepo) GetDocument(ctx context.Context, indexName string, documentID string) (interface{}, error) {
	resp, err := e.client.Get(indexName, documentID).Do(ctx)
	if err != nil {
		return nil, fmt.Errorf("failed to get document: %w", err)
	}

	if !resp.Found {
		return nil, fmt.Errorf("document not found")
	}

	var document map[string]interface{}
	if err := json.Unmarshal(resp.Source_, &document); err != nil {
		return nil, fmt.Errorf("failed to unmarshal document: %w", err)
	}

	return document, nil
}

func (e *elasticRepo) UpdateDocument(ctx context.Context, indexName string, documentID string, update interface{}) error {
	_, err := e.client.Update(indexName, documentID).
		Doc(update).
		Do(ctx)

	if err != nil {
		return fmt.Errorf("failed to update document: %w", err)
	}

	slog.Debug("Document updated successfully", "index", indexName, "id", documentID)
	return nil
}

func (e *elasticRepo) DeleteDocument(ctx context.Context, indexName string, documentID string) error {
	_, err := e.client.Delete(indexName, documentID).Do(ctx)
	if err != nil {
		return fmt.Errorf("failed to delete document: %w", err)
	}

	slog.Debug("Document deleted successfully", "index", indexName, "id", documentID)
	return nil
}
