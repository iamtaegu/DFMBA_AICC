FROM openjdk:17-slim

# The application's jar file
ARG JAR_FILE

# Add the application's jar to the container
COPY ${JAR_FILE} app.jar

# unpackage jar file
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf /app.jar)

# execute the application
ENTRYPOINT ["java", "-jar", "/app.jar"]
