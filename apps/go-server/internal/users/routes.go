package users

import (
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// RegisterRoutes initializes the repository, service, and handler for user auth
// and mounts the routes onto the provided Chi router.
func RegisterRoutes(r chi.Router, db *pgxpool.Pool, jwtSecret string) {
	repo := NewRepository(db)
	service := NewService(repo, jwtSecret)
	handler := NewHandler(service)

	r.Mount("/auth", handler.Routes(AuthMiddleware(service)))
}
