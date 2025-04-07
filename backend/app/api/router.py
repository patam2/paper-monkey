from fastapi import APIRouter
from celery.result import AsyncResult
from celery_core.worker import app
from celery_core.tasks.newsletter import mail
from app.core.settings import Settings
router = APIRouter()

settings = Settings()
print(1, settings.EMAIL_USERNAME)

@router.get("/newspaper")
async def get_newspaper():
    print('')
    newsletter_response = mail.apply_async(('patriktamm04@gmail.com', 'Test Email', 'Monkey email test'))
    return newsletter_response.id

@router.get('/newspaper/{newspaper}')
async def newspaper_by_id(newspaper: str):
    r = AsyncResult(newspaper, app=app)
    return r.get()