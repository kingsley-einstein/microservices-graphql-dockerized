ARG JDK_VERSION=11
FROM openjdk:${JDK_VERSION}
COPY src ./
COPY *.xml .
COPY .mvn .
COPY mvn* .
COPY . .
ENV PORT 8700
ENV BUILD_FOLDER target/product-service-0.0.1-SNAPSHOT.jar
RUN ["./mvnw", "clean", "package", "-DskipTests"]
COPY ${BUILD_FOLDER} app.jar
EXPOSE ${PORT}
ENTRYPOINT ["java", "-jar", "app.jar"]