package config

import (
	"log/slog"
	"net/url"
	"reflect"
	"strings"
)

type Config struct {
	SecretKey string `env:"SECRET_KEY"`

	AWSRegion     string `env:"AWS_REGION"`
	AWSAccessKey  string `env:"AWS_ACCESS_KEY_ID"`
	AWSSecretKey  string `env:"AWS_SECRET_ACCESS_KEY"`
	AWSEndpoint   string `env:"AWS_S3_ENDPOINT_URL"`
	AWSBucketName string `env:"AWS_S3_BUCKET_NAME"`

	DatabaseDSN string `env:"DATABASE_URL"`

	ElasticsearchURL      string `env:"ELASTICSEARCH_URL"`
	ElasticsearchUsername string `env:"ELASTICSEARCH_USERNAME"`
	ElasticsearchPassword string `env:"ELASTICSEARCH_PASSWORD"`

	AppServerURL  string `env:"APP_SERVER_URL"`
	AppServerPort string `env:"APP_SERVER_PORT"`
}

func ReadConfig() *Config {
	config := &Config{}

	envConfig("env", config)

	return config
}

func envConfig(key string, s interface{}) {
	v := reflect.ValueOf(s).Elem()
	typeParam := v.Type()
	for i := 0; i < v.NumField(); i++ {
		fName := typeParam.Field(i).Name
		fEnvTag := typeParam.Field(i).Tag.Get(key)

		if !Exist(fEnvTag) {
			continue
		}

		logValue := GetEnv(fEnvTag)
		if logValue == "" {
			continue
		}

		// Secure passwords in log
		if strings.Contains(strings.ToLower(fName), "pass") || strings.Contains(strings.ToLower(fName), "secret") || strings.Contains(strings.ToLower(fName), "token") {
			pass := strings.Split(GetEnv(fEnvTag), "")
			logValue = pass[0]
			for i := 1; i < len(pass)-1; i++ {
				logValue += "*"
			}
			logValue += pass[len(pass)-1]

		} else if u, err := url.Parse(GetEnv(fEnvTag)); err == nil {
			if _, ok := u.User.Password(); ok {
				u.User = url.UserPassword(u.User.Username(), "SECRET")
			}
			logValue = u.String()
		}

		slog.Info("Set config value",
			slog.String("key", typeParam.Name()+"."+fName),
			slog.String("value", logValue),
			slog.String("source", "ENVIRONMENT"),
		)

		switch v.Field(i).Interface().(type) {
		case string:
			v.Field(i).SetString(GetEnv(fEnvTag))
		case int:
			v.Field(i).SetInt(int64(GetIntEnv(fEnvTag)))
		case bool:
			v.Field(i).SetBool(GetBoolEnv(fEnvTag))
		case *url.URL:
			v.Field(i).Set(reflect.ValueOf(GetURLEnv(fEnvTag)))
		}
	}
}
