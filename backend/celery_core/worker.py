from celery import Celery
from app.newsletter.generate import generate_newsletter



app = Celery('tasks', broker='redis://redis:6379')


@app.task(name='tasks.generate_newsletter')
def mail():
    print()
    print(generate_newsletter())
#app.conf.imports = ['tasks.generate_newsletter']