# Backend Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Copy the rest of the application
COPY . .

# Install dependencies
RUN npm install

# Expose the port
EXPOSE 8080

# Run the application
ENTRYPOINT ["npm", "run", "start"]
