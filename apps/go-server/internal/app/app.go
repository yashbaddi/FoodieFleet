package app

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/yashbaddi/foodiefleet/internal/health"
	"github.com/yashbaddi/foodiefleet/internal/platform/config"
	"github.com/yashbaddi/foodiefleet/internal/platform/db"
	"github.com/yashbaddi/foodiefleet/internal/restaurants"
)

type App struct {
	cfg    *config.Config
	db     *db.Database
	router *chi.Mux
}

func New() (*App, error) {
	// 1. Load config
	cfg, err := config.LoadConfig()
	if err != nil {
		return nil, fmt.Errorf("failed to load config: %w", err)
	}

	// 2. Connect Database
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	postgres, err := db.NewPostgres(ctx, cfg.Database)
	if err != nil {
		return nil, fmt.Errorf("failed to connect to database: %w", err)
	}

	app := &App{
		cfg: cfg,
		db:  postgres,
	}

	app.setupRouter()

	return app, nil
}

func (a *App) setupRouter() {
	r := chi.NewRouter()

	// Standard production middlewares
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(middleware.Timeout(30 * time.Second))

	// Liveness/Readiness root check
	r.Get("/health", health.Handler)

	// Sub-router grouping for /api
	r.Route("/api", func(api chi.Router) {
		api.Get("/health", health.Handler)

		// Self-contained feature registration
		restaurants.RegisterRoutes(api, a.db.Pool)
	})

	a.router = r
}

func (a *App) Run() error {
	defer a.db.Close()

	port := a.cfg.App.Port
	if port == 0 {
		port = 8002
	}

	server := &http.Server{
		Addr:         fmt.Sprintf(":%d", port),
		Handler:      a.router,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 10 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	serverErrors := make(chan error, 1)
	go func() {
		log.Printf("Server starting on port :%d", port)
		serverErrors <- server.ListenAndServe()
	}()

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, os.Interrupt, syscall.SIGTERM)

	select {
	case err := <-serverErrors:
		if !errors.Is(err, http.ErrServerClosed) {
			return fmt.Errorf("server error: %w", err)
		}
	case sig := <-shutdown:
		log.Printf("shutdown signal received: %v. Initiating graceful shutdown...", sig)
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			log.Printf("graceful shutdown failed: %v, forcing close", err)
			_ = server.Close()
		}
		log.Println("server stopped cleanly")
	}

	return nil
}
