from fastapi import APIRouter
from celery_core.worker import mail
router = APIRouter()

@router.get("/newspaper")
async def get_newspaper():
    print('')
    newsletter_response = mail.apply_async()
    return newsletter_response.id