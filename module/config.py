from pydantic import BaseSettings

class Settings(BaseSettings):
  app_host: str = "127.0.0.1"
  app_port: int = 8000
  debug: bool = False

  class Config:
    env_file = ".env"

settings = Settings()
