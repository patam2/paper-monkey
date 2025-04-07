from app.newsletter.generate import generate_newsletter
from celery_core.worker import app


@app.task
def mail():
    print()
    return generate_newsletter()