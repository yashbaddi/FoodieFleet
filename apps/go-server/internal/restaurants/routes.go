package restaurants

import (
	"github.com/go-chi/chi/v5"
	"github.com/jackc/pgx/v5/pgxpool"
)

// RegisterRoutes initializes the repository, service, and handler for restaurants
// and mounts the routes onto the provided Chi router.
func RegisterRoutes(r chi.Router, db *pgxpool.Pool) {
	repo := NewRepository(db)
	service := NewService(repo)
	handler := NewHandler(service)

	r.Mount("/restaurants", handler.Routes())
}

func (h *Handler) Routes() chi.Router {
	r := chi.NewRouter()
	r.Get("/", h.List)
	return r
}
