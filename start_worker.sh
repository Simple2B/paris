echo - = RESET BOT = -
poetry run flask reset-bot
echo - = START WORKER = -
poetry run celery -A app.controllers.celery.celery_worker:celery worker -B --concurrency=1
