# ---- Stage 1: Build ----
# This stage installs dependencies, compiles TypeScript, and prepares the app
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies, including devDependencies for TypeScript compilation
RUN npm install

# Copy the rest of the application source code
COPY . .

# Compile TypeScript to JavaScript
RUN npx tsc

# ---- Stage 2: Production ----
# This stage creates the final, lean image with only the necessary files
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json again
COPY package*.json ./

# Install ONLY production dependencies
RUN npm install --omit=dev

# Copy the compiled JavaScript code from the 'builder' stage
COPY --from=builder /app/dist ./dist

# Expose the port your app runs on (change 3000 if necessary)
EXPOSE 3000

# The command to start the application
CMD [ "node", "dist/server.js" ]