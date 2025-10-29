# Build-Stage: Maven + Temurin 25
FROM eclipse-temurin:25-jdk AS build

# Tools installieren (optional)
RUN apt-get update && apt-get install -y curl unzip git

# Maven installieren
RUN curl -L https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip -o /tmp/maven.zip && \
    unzip /tmp/maven.zip -d /opt && \
    ln -s /opt/apache-maven-3.9.6 /opt/maven && \
    rm /tmp/maven.zip

ENV MAVEN_HOME=/opt/maven
ENV PATH=${MAVEN_HOME}/bin:$PATH

WORKDIR /app
COPY pom.xml .
COPY src ./src

# Builden
RUN mvn clean package -DskipTests

# Run-Stage: Temurin 25 + fertige JAR
FROM eclipse-temurin:25-jdk
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
