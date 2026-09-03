package config

import (
	"fmt"
	"strings"

	_ "github.com/joho/godotenv/autoload"
	"github.com/knadh/koanf/providers/env"
	"github.com/knadh/koanf/v2"
)

type Config struct {
	Database DatabaseConfig `koanf:"database"`
	App      AppConfig      `koanf:"app"`
	Redis    RedisConfig    `koanf:"redis"`
}

type AppConfig struct {
	Port int `koanf:"port"`
}

type DatabaseConfig struct {
	URL      string `koanf:"url"`
	MaxConns int    `koanf:"max_conns"`
	MinConns int    `koanf:"min_conns"`
}

type RedisConfig struct {
	Addr     string `koanf:"addr"`
	Password string `koanf:"password"`
}

func LoadConfig() (*Config, error) {
	var cfg Config

	k := koanf.New(".")
	if err := k.Load(env.Provider(
		"",
		".",
		func(s string) string {
			s = strings.ToLower(s)
			return strings.Replace(s, "_", ".", 1)
		},
	), nil); err != nil {
		return nil, fmt.Errorf("failed loading env vars: %w", err)
	}

	if err := k.Unmarshal("", &cfg); err != nil {
		return nil, err
	}

	return &cfg, nil

}

//TODO - Add Validator and logger
