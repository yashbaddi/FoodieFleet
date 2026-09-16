package users

import (
	"context"
	"net/http"
	"strings"

	"github.com/yashbaddi/foodiefleet/internal/platform/response"
)

type contextKey string

const UserIDKey contextKey = "userID"

func AuthMiddleware(svc *Service) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			token := extractToken(r)
			if token == "" {
				response.Error(w, http.StatusUnauthorized, "Unauthorized: No token provided")
				return
			}

			userID, err := svc.ValidateToken(token)
			if err != nil {
				response.Error(w, http.StatusUnauthorized, "Unauthorized")
				return
			}

			ctx := context.WithValue(r.Context(), UserIDKey, userID)
			next.ServeHTTP(w, r.WithContext(ctx))
		})
	}
}

func extractToken(r *http.Request) string {
	if cookie, err := r.Cookie("token"); err == nil && cookie.Value != "" {
		return cookie.Value
	}
	if auth := r.Header.Get("Authorization"); strings.HasPrefix(auth, "Bearer ") {
		return strings.TrimPrefix(auth, "Bearer ")
	}
	return ""
}

func UserIDFromContext(ctx context.Context) (string, bool) {
	userID, ok := ctx.Value(UserIDKey).(string)
	return userID, ok
}
