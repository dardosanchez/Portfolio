# ETAPA 1: BUILD (Construcción)
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR /app
COPY . .
# Construimos el .jar saltando los tests (igual que hicimos recién)
RUN mvn clean package -DskipTests

# ETAPA 2: RUN (Ejecución)
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
# Copiamos el .jar generado en la etapa anterior
COPY --from=build /app/target/portfolio_backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]