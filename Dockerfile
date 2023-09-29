# Use the official Node.js image as the base image
FROM node:18.18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all required dependencies
RUN npm ci

# Copy the entire project to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Use the official Nginx image as a reverse proxy and to serve the static files
FROM nginx:1.25-alpine AS final

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]