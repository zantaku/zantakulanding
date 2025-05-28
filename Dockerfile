# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy everything from the current directory to the container
COPY . .

# Install pm2 and serve globally
RUN npm install -g pm2 serve

# Expose port 8080
EXPOSE 8080

# Check if index.html exists in root, otherwise serve the dist directory
RUN if [ ! -f ./index.html ]; then echo "No index.html in root, will serve entire directory"; fi

# Start the app using PM2 to serve static files
CMD ["pm2-runtime", "start", "serve", "--", "--single", "--listen", "8080", "."] 