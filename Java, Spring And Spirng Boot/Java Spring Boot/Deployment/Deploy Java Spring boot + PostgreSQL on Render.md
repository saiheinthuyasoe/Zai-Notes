# Step 1 

1. create new files in your backend folder --> Dockerfile and docker-compose.yml
2. In Dockerfile, add these codes below:

```dockerfile
# Use Maven to build the application
# maven:3.9.9-amazoncorretto-23-al2023 ---> Get from Docker Hub
FROM maven:3.9.9-amazoncorretto-23-al2023 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Use OpenJDK to run the application
# openjdk:25-slim-bullseye ---> Get from Docker Hub
# {todotask-0.0.1.jar} ---> The name of the jar file and todotask is the name of artifactId in pom.xml
FROM openjdk:25-slim-bullseye
WORKDIR /app
COPY --from=build /app/target/todotask-0.0.1.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

3. In docker-compose.yml, add these codes below:

```yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "8080:8081"
    restart: always
```
4. 