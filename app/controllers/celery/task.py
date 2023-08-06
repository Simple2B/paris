from time import sleep
from .celery_flask import celery_app as celery

import os

from app.logger import log


@celery.task
def get_pid() -> int:
    PID = os.getpid()
    log(log.INFO, "PID: [%s]", PID)
    return os.getpid()


@celery.task
def w30():
    PID = os.getpid()
    log(log.INFO, "PID: [%s]", PID)
    log(log.INFO, "W30 started")
    sleep(30)
    log(log.INFO, "W30 finished")
    return 0


@celery.task
def w60():
    PID = os.getpid()
    log(log.INFO, "PID: [%s]", PID)
    log(log.INFO, "W60 started")
    sleep(60)
    log(log.INFO, "W60 finished")
    return 0


@celery.task
def w90():
    PID = os.getpid()
    log(log.INFO, "PID: [%s]", PID)
    log(log.INFO, "W90 started")
    sleep(90)
    log(log.INFO, "W90 finished")
    return 0
