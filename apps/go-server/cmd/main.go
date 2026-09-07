package main

import (
	"log"

	"github.com/yashbaddi/foodiefleet/internal/app"
)

func main() {
	application, err := app.New()
	if err != nil {
		log.Fatalf("failed to initialize application: %v", err)
	}

	if err := application.Run(); err != nil {
		log.Fatalf("application error: %v", err)
	}
}
