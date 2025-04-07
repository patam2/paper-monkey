from celery import Celery



app = Celery(
    'monkeymail', 
    broker='redis://localhost:6379',
    backend='redis://localhost:6379',  
    include=['celery_core.tasks.newsletter']
)

#app.autodiscover_tasks(['celery_core.tasks.newsletter'])
app.conf.update(enable_utc=True)


print(app.tasks)

#app.conf.beat_schedule()