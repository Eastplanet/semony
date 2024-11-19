# 1. Base Image로 OpenJDK 21 사용
FROM openjdk:21-jdk-slim

# 2. JAR 파일을 컨테이너로 복사
ARG JAR_FILE=build/libs/integrated-*-SNAPSHOT.jar
COPY ${JAR_FILE} integrated.jar

# 4. 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/integrated.jar"]
