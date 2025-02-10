# Step 1 Create a Dockerfile For Spring Boot

1. create new files in your backend folder --> Dockerfile
2. In Dockerfile, add these codes below:

```dockerfile with comments
# Use Maven to build the application
# maven:3.9.9-amazoncorretto-23-al2023 ---> Get from Docker Hub
FROM maven:3.9.9-amazoncorretto-23-al2023 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

#####################################################
# Use OpenJDK to run the application
# openjdk:25-slim-bullseye ---> Get from Docker Hub
# {todotask-0.0.1.jar} ---> The jar file will be created in the target directory
# /app/target/ --> if you use Intellija IDEA, the jar file will be created in this directory. If you don't see target folder on VScode run this code --> mvn clean install

FROM openjdk:25-slim-bullseye
WORKDIR /app
COPY --from=build /app/target/todotask-0.0.1.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**OR**

```dockerfile without comments
FROM maven:3.9.9-amazoncorretto-23-al2023 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

##################################################

FROM openjdk:25-ea-5
WORKDIR /app
COPY --from=build /app/target/todotask-0.0.1.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

---

# Step 2 Create docker-compose.yml file for Spring Boot

1. create new files in your backend folder --> docker-compose.yml
2. In docker-compose.yml, add these codes below:

```yml with comments
# This is a docker-compose file that is used to run the backend and database in the same network.
services:
  # Backend Spring Boot application
  app:
    # Build the Docker image from the Dockerfile in the current directory.
    build: .

    # Set the container name
    container_name: todo-task-container

    # Expose port 8080 to host machine
    ports:
      - "8080:8080"

    # Define the dependencies of the app service.
    depends_on:
      - postgresqldb
      # This is service name, you can set any service names instead of postgresqldb.

    # Define environment variables for the app service.
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgresqldb:5432/postgres
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: 2480
      # In your backend application.properties file, change the database URL
      # from localhost to the service name "postgresqldb" defined in this file.
      # E.g., spring.datasource.url=jdbc:postgresql://postgresqldb:5432/todo_management

    # Connect the app service to the custom network "app_network".
    networks:
      - app_network

  # PostgreSQL database service
  postgresqldb:
    # Use the official postgres image from the Docker Hub registry.
    image: postgres:latest

    # Set container name
    container_name: todo-postgresql-container

    # Mount a volume to persist the data. The volume is created using the postgres_data volume driver.
    volumes:
      - postgres_data:/var/lib/postgresql/data

    environment:
      # POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD are environment variables that are used to create a database, user, and password in the postgres container.
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 2480

    # Expose port 5432 to host machine
    ports:
      - "5432:5432"

    # Define a health check for the postgresqldb service.
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

    # Connect the postgresqldb service to the custom network "app_network".
    networks:
      - app_network

# Create a volume to persist the data
volumes:
  postgres_data:

# Define a custom network
networks:
  app_network:
    driver: bridge
```

**OR**

```yml without command
version: "3.8"

services:
  app:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - postgresqldb
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgresqldb:5432/postgres
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: 2480
    networks:
      - app_network

  postgresqldb:
    image: postgres:15
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: 2480
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - app_network

volumes:
  postgres_data:

networks:
  app_network:
    driver: bridge
```

- **Note** Sometimes you need to change "8080:8080" or "8080:8081,2,3" if you get error when docker-compose up.

---

# Step 3 Build or Pull Images to Docker

1. Type or use this codes in your Vscode terminal in your backend folder:

```bash
mvn clean
```

2. Type or use this codes in your VScode terminal in your backend folder:

```bash
docker-compose up
```

# Step 4 Push to Git Repository

Push your backend application to a GitHub, GitLab, or Bitbucket repository. Render will deploy from your repository.

# Step 5 Create Database on Render

**1: Log in to Your Render Account**

1. Go to [Render](https://render.com/).
2. Log in to your account or sign up if you don’t already have one.

---

**2: Navigate to the Databases Section**

1. Once you're logged in, go to your **Dashboard**.
2. Click the **New +** button in the top-right corner of the screen.
3. From the dropdown, select **PostgreSQL** under the **Databases** section.

---

**3: Configure the Database**

1. Fill out the database configuration form:

   - **Database Name**: Provide a name for your database (e.g., `my_database`).
   - **Region**: Choose a region close to your application’s deployment for better performance.
   - **Instance Type**: Select the type of database instance based on your app's needs (e.g., Free or Standard plans).
   - Leave other fields as default unless you have specific needs.

2. Click **Create Database** to finish the setup.

---

**4: Access Your Database Credentials**
Once the database is created, Render will provide you with the connection details. These typically include:

- **Database Host**: The URL of the database server (e.g., `postgres.render.com`).
- **Database Name**: The name of the database you created.
- **User**: The default username for the database (usually `postgres`).
- **Password**: A password automatically generated by Render.
- **Port**: The port for the database (default is `5432`).

> 💡 **Tip**: Save these credentials somewhere secure (e.g., `.env` file or a password manager) for later use.

---

**5: Update Your Application Configuration**
Now, integrate Render's database credentials into your project.
**Option A: Update `application.properties`**
If you're not using Docker Compose, update your `application.properties` file in the Spring Boot project like this:

```properties
spring.datasource.url=jdbc:postgresql://<DatabaseHost>:5432/<DatabaseName>
spring.datasource.username=<DatabaseUser>
spring.datasource.password=<DatabasePassword>
spring.jpa.hibernate.ddl-auto=update
```

Replace `<DatabaseHost>`, `<DatabaseName>`, `<DatabaseUser>`, and `<DatabasePassword>` with the values Render provides.

---

**B: Update `docker-compose.yml`**
If you’re using Docker Compose, update the `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` environment variables in your `docker-compose.yml`:

```yaml
services:
  app:
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://<DatabaseHost>:5432/<DatabaseName>
      SPRING_DATASOURCE_USERNAME: <DatabaseUser>
      SPRING_DATASOURCE_PASSWORD: <DatabasePassword>
```

Replace the placeholders with the values from Render.

---

**6: Test the Connection**

1. Deploy your application locally or on Render and ensure it connects to the PostgreSQL database.
2. Check the logs in your Render dashboard for any errors related to database connectivity.

---

# Step 6. Deploy Your App on Render

1. Go to the **Dashboard** in Render.
2. Click **New +** and select **Web Service**.
3. Link your Git repository.
4. Set the **Environment** to `Docker`.
5. Provide the **Build Command** (optional if you use Docker Compose):
   ```bash
   docker-compose up
   ```
6. Add environment variables in the **Environment** section:
   - `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<RenderDBHost>:5432/<DatabaseName>`
   - `SPRING_DATASOURCE_USERNAME`: `<YourDatabaseUser>`
   - `SPRING_DATASOURCE_PASSWORD`: `<YourDatabasePassword>`
