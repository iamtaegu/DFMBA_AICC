#stage 1
#Start with a base image containing Java runtime
FROM openjdk:17-slim as build

# Add Maintainer Info
LABEL maintainer="ohtaegeon <gmdals45@gmail.com>"

# The application's jar file
# ARG - docker build 명령을 사용하여 빌더에 전달할 수 있는 변수 정의
ARG JAR_FILE

# Add the application's jar to the container
# JAR 파일을 이미지의 파일 시스템에 app.jar로 복사
COPY ${JAR_FILE} app.jar

#unpackage jar file
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf /app.jar)

#stage 2
#Same Java runtime
FROM openjdk:17-slim

#Add volume pointing to /tmp
VOLUME /tmp

#Copy unpackaged application to new container
ARG DEPENDENCY=/target/dependency
COPY --from=build ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=build ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=build ${DEPENDENCY}/BOOT-INF/classes /app

#execute the application
#이미지의 서비스 애플리케이션을 실행 대상으로 지정
ENTRYPOINT ["java", "-jar", "/app.jar"]
#ENTRYPOINT ["java","-cp","app:app/lib/*","com.dfmba.aicc.AiccApplication"]
