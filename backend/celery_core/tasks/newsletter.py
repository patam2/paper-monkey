from app.newsletter.generate import generate_newsletter
from app.mail.send_email import Mailer
from celery_core.worker import app


@app.task
def mail(to, subject, body):
    m = Mailer().send_email(to, subject, body)
    return m 