from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import router

print(router)


app = FastAPI()
app.include_router(router)

