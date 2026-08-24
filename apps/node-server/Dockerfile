# Node.js backend Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package configuration files
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose backend application port
EXPOSE 8001

# Run Node.js application
CMD ["node", "app.js"]
