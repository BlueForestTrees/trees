FROM maven:3.5.0-jdk-8 AS trees.api.jar
WORKDIR /usr/src/trees
COPY pom.xml .
RUN mvn -B -f pom.xml -s /usr/share/maven/ref/settings-docker.xml dependency:resolve
COPY . .
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package -DskipTests

FROM openjdk:8-jre-alpine
COPY --from=trees.api.jar /usr/src/trees/target/trees.api-1.0-SNAPSHOT.jar trees.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","trees.jar"]