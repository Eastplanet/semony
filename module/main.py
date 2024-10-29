# main.py
import uvicorn
from fastapi import FastAPI
from config import settings

app = FastAPI()

@app.get("/")
def read_root():
  return {"message": "Hello World"}

if __name__ == "__main__":
  uvicorn.run(app, host=settings.app_host, port=settings.app_port, reload=settings.debug)
