package restaurants

import (
	"net/http"

	"github.com/yashbaddi/foodiefleet/internal/platform/response"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	data, err := h.service.List(ctx)
	if err != nil {
		_ = response.Error(w, http.StatusInternalServerError, "failed to fetch restaurants")
		return
	}

	_ = response.JSON(w, http.StatusOK, data)
}
