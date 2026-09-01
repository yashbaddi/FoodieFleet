import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FoodieFleet API Documentation",
      version: "1.0.0",
      description:
        "Comprehensive, systematic REST and WebSocket API documentation for FoodieFleet multi-service food delivery platform.",
      contact: {
        name: "FoodieFleet Development Team",
      },
    },
    servers: [
      {
        url: "/api",
        description: "API Base Path (/api)",
      },
      {
        url: "/",
        description: "Root Base Path (/)",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "JWT authentication token passed via HTTP-only cookie.",
        },
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT authorization token passed in Authorization header.",
        },
      },
    },
  },
  apis: ["./routes/*.js", "./routes/**/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
