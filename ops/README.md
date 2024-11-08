## 서버 구성
1. 메인 (AWS LightSail) - Ubuntu
- Front
    - 프론트 서버 3000
    - React (docker container)
- Integrated
    - 백엔드 서버 8080
    - Spring boot (docker container)
- DB
    - 데이터베이스 서버 5432
    - postgres:latest (docker container)
- Jenkins
    - jenkins:jdk21 (docker container)
- nginx

2. 모듈 1 (AWS LightSail) - Ubuntu
- EWIM1-36, EWIM1-46, MIW7-51, MIW7-52
    - 데이터 생성 서버 8081~8084
    - FastAPI (docker container)

3. 모듈 2 (AWS LightSail) - Ubuntu
- EWIM2-36, EWIM2-46, MIW7-61, MIW7-62
    - 데이터 생성 서버 8081~8084
    - FastAPI (docker container)

4. Maker (AWS EC2) - Ubuntu
- Maker
    - 데이터 관리 서버 8080
- DB
    - 데이터베이스 서버 27017
    - mongo:latest (docker container)