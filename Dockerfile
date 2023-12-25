# Use a Node.js runtime as a base image
FROM node:16.20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package.lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .env

# Add the additional endpoints.
COPY products/ products/

# Install dependencies for product endpoints
WORKDIR /usr/src/app/products
RUN npm install

# Return to the main working directory
WORKDIR /usr/src/app

# Install dependencies for pets endpoints
WORKDIR /usr/src/app/pets
RUN npm install

# Return to the main working directory
WORKDIR /usr/src/app

# Run Directus bootstrap command to initialize the database
# RUN npx directus bootstrap

# Expose the port used by Directus
EXPOSE 8055

# Command to run Directus
CMD ["npm", "start"]