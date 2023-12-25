# Dockerized Directus

Dockerized Directus is a project that facilitates the seamless deployment of [Directus](https://directus.io/) using Docker containers. This README provides detailed instructions on configuring, running, and customizing your Directus instance.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Build and Run Docker Containers](#build-and-run-docker-containers)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Database Connection](#database-connection)
- [Custom Endpoints and Hooks](#custom-endpoints-and-hooks)
  - [Custom Endpoints](#custom-endpoints)
  - [Custom Hooks](#custom-hooks)


## Prerequisites

Ensure Docker and Docker Compose are installed on your machine. Follow the installation guides for [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Synque/derp-exp.git
cd your-repository
```

### Build and Run Docker Containers

```bash
docker-compose build
docker-compose up -d
```

### Usage


1. After setting up the Docker containers, you can access the Directus admin interface by navigating to http://localhost:5000 in your web browser. Nginx is configured to forward requests to Directus.

2. Log in to Directus using the default admin credentials:
   - Email: `admin@example.com`
   - Password: (Randomly generated during installation, not retrievable)

   **Important**: It's mandatory to change the default admin password before attempting to log in. To change the password:

   - Access your database.
   - Locate the `users` table in the Directus database.
   - Find the entry for `admin@example.com`.
   - Change the `password` field to `$argon2id$v=19$m=65536,t=3,p=4$bRDfmGHDZ242R4QKekJguA$MFW2Wk6JaOGhwUW4yOOM7sycT/nnUSmr8us3Y5XMC40` (equivalent to `d1r3ctu5`).

   Use `admin@example.com` and `d1r3ctu5` to log in.



## Configuration

### Environmental Variables

Before running the Docker containers, make sure to set up the required environmental variables. These variables are crucial for the proper functioning of the Dockerized Directus.

Configure Directus by modifying the environment variables in the .env file.

```env
# Directus Configuration
DB_CLIENT=Database client (e.g., mysql).
DB_HOST= Database host.
DB_PORT= Database port.
DB_DATABASE=Database name.
DB_USER=Database user.
DB_PASSWORD=Database password.
```

### Database Connection

Ensure the database connection details in the .env file match your database setup.


## Custom Endpoints and Hooks

Extend the functionality of your Directus instance with custom endpoints and hooks. Follow these steps to include them in your Dockerized environment:

### Custom Endpoints

1. Create your custom endpoint scripts in the `custom-endpoints/` directory.

2. Ensure that the Dockerfile copies the custom endpoints:

   ```dockerfile
   COPY custom-endpoints/ custom-endpoints/
   ```

3. Install dependencies for custom endpoints:
```WORKDIR /usr/src/app/custom-endpoints
RUN npm install
```

### Custom Hooks
1. Create your custom hooks scripts in the `custom-hooks/` directory.

2. Ensure that the Dockerfile copies the custom hooks:

  ```dockerfile
  COPY custom-hooks/ custom-hooks/
  ```
3. Install dependencies for custom hooks:
```WORKDIR /usr/src/app/custom-hooks
RUN npm install
```