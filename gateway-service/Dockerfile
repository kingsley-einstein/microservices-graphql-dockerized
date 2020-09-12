ARG JDK_VERSION=11-jdk-alpine
FROM openjdk:${JDK_VERSION}
ARG JARFILE=target/demo-0.0.1-SNAPSHOT.jar
COPY ${JARFILE} app.jar
ENTRYPOINT ["java" "-jar", "app.jar"]