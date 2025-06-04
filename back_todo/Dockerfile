#-------------------------
# STAGE 1: Build con Maven
#-------------------------
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app

# Aquí el pom.xml está en back_todo/pom.xml porque movimos el Dockerfile dentro de back_todo
COPY pom.xml .  
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests -B

#-------------------------
# STAGE 2: Runtime (JRE slim)
#-------------------------
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java -Dserver.port=$PORT -jar /app/app.jar"]

