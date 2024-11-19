# Step 1: Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies and build the app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Install only production dependencies in the runner stage
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy build artifacts from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]
