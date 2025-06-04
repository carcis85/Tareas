#----------------------------------------------------------------
# STAGE 1: Build con Maven
#----------------------------------------------------------------
FROM maven:3.8.5-openjdk-17-slim AS build

# Directorio de trabajo dentro del contenedor de build
WORKDIR /app

# Copiamos únicamente el pom.xml primero para aprovechar el caché de Docker
COPY pom.xml .

# Descargamos las dependencias sin copiar todavía el código fuente
RUN mvn dependency:go-offline -B

# Ahora copiamos el resto del código fuente
COPY src ./src

# Compilamos y empacamos sin ejecutar tests 
RUN mvn clean package -DskipTests -B

#----------------------------------------------------------------
# STAGE 2: Imagen de producción
#----------------------------------------------------------------
FROM openjdk:17-jdk-slim

# Directorio de trabajo en la imagen final
WORKDIR /app

# Copiamos el JAR generado en el stage anterior
COPY --from=build /app/target/*.jar app.jar

# Por defecto Spring Boot escucha en el puerto 8080, pero Render asigna uno dinámico en la variable $PORT.
# Por eso, en ENTRYPOINT indicamos -Dserver.port=$PORT para que Spring Boot use ese puerto.
EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -Dserver.port=$PORT -jar /app/app.jar"]
