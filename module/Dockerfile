# 1. 베이스 이미지 선택 (Python 3.9 버전 사용)
FROM python:3.9-slim

# 2. 작업 디렉토리 생성 및 설정
WORKDIR /app

# 3. 필요한 패키지 설치를 위한 요구사항 파일 복사
COPY requirements.txt .

# 4. 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 5. 애플리케이션 코드 복사
COPY . .

# 6. FastAPI 애플리케이션 실행 (uvicorn 사용)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]
