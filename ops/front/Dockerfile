# Step 1: Use Node.js to build the Next.js app
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Copy the rest of the application source code
COPY . ./

# Build the Next.js app
RUN npm run build

# Step 2: Run the Next.js app in production
FROM node:18 AS runner

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]