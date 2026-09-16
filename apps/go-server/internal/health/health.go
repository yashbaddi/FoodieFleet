package health

import (
	"encoding/json"
	"net/http"
	"time"
)

var startTime = time.Now()

type Response struct {
	Status    string  `json:"status"`
	Timestamp string  `json:"timestamp"`
	Uptime    float64 `json:"uptime"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	json.NewEncoder(w).Encode(Response{
		Status:    "UP",
		Timestamp: time.Now().UTC().Format(time.RFC3339),
		Uptime:    time.Since(startTime).Seconds(),
	})
}
