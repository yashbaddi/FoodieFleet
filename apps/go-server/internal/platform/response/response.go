package response

import (
	"encoding/json"
	"net/http"
)

// ErrorResponse represents a standard JSON error response body.
type ErrorResponse struct {
	Message string `json:"message"`
}

// JSON sends a JSON response with the given status code and payload.
func JSON(w http.ResponseWriter, status int, data any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if data == nil {
		return nil
	}

	return json.NewEncoder(w).Encode(data)
}

// Error sends a JSON error response with the given status code and message.
func Error(w http.ResponseWriter, status int, message string) error {
	return JSON(w, status, ErrorResponse{Message: message})
}
