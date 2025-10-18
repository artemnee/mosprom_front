package config

import (
	"net/url"
	"os"
	"strconv"
)

func Exist(key string) bool {
	_, exist := os.LookupEnv(key)
	return exist
}

func GetEnv(key string) string {
	val, _ := os.LookupEnv(key)
	return val
}

func GetIntEnv(key string) int {
	val, _ := os.LookupEnv(key)
	v, err := strconv.Atoi(val)
	if err != nil {
		return 0
	}
	return v
}

func GetBoolEnv(key string) bool {
	val, _ := os.LookupEnv(key)
	v, err := strconv.ParseBool(val)
	if err != nil {
		return false
	}
	return v
}

func GetURLEnv(key string) *url.URL {
	val, _ := os.LookupEnv(key)
	u, err := url.Parse(val)
	if err != nil {
		return nil
	}
	return u
}
