poetry run celery -A app.controllers.celery:celery worker -B --concurrency=1
