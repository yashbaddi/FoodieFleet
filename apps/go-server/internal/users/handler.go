package users

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/yashbaddi/foodiefleet/internal/platform/response"
)

type Handler struct {
	serv *Service
}

func NewHandler(serv *Service) *Handler {
	return &Handler{
		serv: serv,
	}
}

func (h *Handler) setTokenCookie(w http.ResponseWriter, token string) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    token,
		Path:     "/",
		MaxAge:   7 * 24 * 60 * 60, // 7 days in seconds
		Expires:  time.Now().Add(7 * 24 * time.Hour),
		HttpOnly: false,
		Secure:   false,
	})
}

func (h *Handler) clearTokenCookie(w http.ResponseWriter) {
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		Expires:  time.Unix(0, 0),
		HttpOnly: false,
		Secure:   false,
	})
}

func (h *Handler) Login(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		_ = response.Error(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if req.Email == "" || req.Password == "" {
		_ = response.Error(w, http.StatusBadRequest, "Email and password are required")
		return
	}

	token, user, err := h.serv.Login(ctx, req)
	if err != nil {
		switch {
		case errors.Is(err, ErrUnauthorized), errors.Is(err, ErrUserNotFound):
			_ = response.Error(w, http.StatusUnauthorized, "Invalid email or password")
		default:
			_ = response.Error(w, http.StatusInternalServerError, "Failed to login")
		}
		return
	}

	h.setTokenCookie(w, token)

	_ = response.JSON(w, http.StatusOK, AuthResponse{
		Message: "Login successful",
		User:    *user,
		Token:   token,
	})
}

func (h *Handler) Register(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		_ = response.Error(w, http.StatusBadRequest, "Invalid request payload")
		return
	}

	if req.Name == "" || req.Email == "" || req.Password == "" {
		_ = response.Error(w, http.StatusBadRequest, "Name, email, and password are required")
		return
	}

	token, user, err := h.serv.Register(ctx, &req)
	if err != nil {
		_ = response.Error(w, http.StatusBadRequest, err.Error())
		return
	}

	h.setTokenCookie(w, token)

	_ = response.JSON(w, http.StatusCreated, AuthResponse{
		Message: "Registration successful",
		User:    *user,
		Token:   token,
	})
}

func (h *Handler) Logout(w http.ResponseWriter, r *http.Request) {
	h.clearTokenCookie(w)
	_ = response.JSON(w, http.StatusOK, map[string]string{
		"message": "Logged out successfully",
	})
}

func (h *Handler) Me(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	userID, ok := UserIDFromContext(ctx)
	if !ok || userID == "" {
		_ = response.Error(w, http.StatusUnauthorized, "Unauthorized")
		return
	}

	user, err := h.serv.GetCurrentUser(ctx, userID)
	if err != nil {
		if errors.Is(err, ErrUserNotFound) {
			_ = response.Error(w, http.StatusNotFound, "User not found")
			return
		}
		_ = response.Error(w, http.StatusInternalServerError, "Internal server error")
		return
	}

	_ = response.JSON(w, http.StatusOK, map[string]*UserDTO{
		"user": user,
	})
}

func (h *Handler) Routes(authMiddleware func(http.Handler) http.Handler) chi.Router {
	r := chi.NewRouter()
	r.Post("/login", h.Login)
	r.Post("/register", h.Register)
	r.Post("/logout", h.Logout)
	if authMiddleware != nil {
		r.With(authMiddleware).Get("/me", h.Me)
	} else {
		r.Get("/me", h.Me)
	}
	return r
}
