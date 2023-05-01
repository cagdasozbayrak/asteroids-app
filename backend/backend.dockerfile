FROM amazoncorretto:20.0.1-alpine3.17
RUN mkdir -p /app
WORKDIR /app
COPY backend/target/backend-0.0.1-SNAPSHOT.jar /app
EXPOSE 8080
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]