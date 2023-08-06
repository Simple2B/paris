# flake8: noqa F401
from .task_bot import init_bot
from .celery_flask import celery_app as celery
from .task import get_pid, w30, w60, w90
