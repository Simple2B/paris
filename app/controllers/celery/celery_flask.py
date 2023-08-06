from celery import Celery
from config import config
from app.logger import log

settings = config()

log(log.INFO, "REDIS_URL: [%s]", settings.REDIS_URL)

celery_app = Celery(__name__)
celery_app.conf.broker_url = settings.REDIS_URL
celery_app.conf.result_backend = settings.REDIS_URL
celery_app.conf.broker_connection_retry_on_startup = True
