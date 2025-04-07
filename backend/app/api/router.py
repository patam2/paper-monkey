from fastapi import APIRouter
from celery.result import AsyncResult
from celery_core.worker import app
from celery_core.tasks.newsletter import mail
router = APIRouter()

@router.get("/newspaper")
async def get_newspaper():
    print('')
    newsletter_response = mail.apply_async()
    return newsletter_response.id

@router.get('/newspaper/{newspaper}')
async def newspaper_by_id(newspaper: str):
    r = AsyncResult(newspaper, app=app)
    return r.get()