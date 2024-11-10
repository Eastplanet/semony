# Step 1: Builder stage
FROM node:18-alpine AS builder
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the application code and build it
COPY . .
RUN npm run build

# Step 2: Runner stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy only the production node_modules from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose port and start the app
EXPOSE 3000
CMD ["npm", "start"]