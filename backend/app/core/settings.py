from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict()
    
    EMAIL_USERNAME: str
    EMAIL_PASSWORD: str

    class Config:
        env_file = '.env'