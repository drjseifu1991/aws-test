# Use the official Nginx image as a base
FROM nginx:latest

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 5000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]