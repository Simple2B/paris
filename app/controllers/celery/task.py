from time import sleep
from .celery_flask import celery_app as celery

from selenium.webdriver.remote.webdriver import WebDriver

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


@celery.task
def processing() -> None:
    """Init bot"""
    from selenium.webdriver.support.wait import WebDriverWait
    from app.controllers import get_browser, sign_in, process_tickets

    for browser in get_browser():
        browser: WebDriver = browser
        wait = WebDriverWait(browser, 4)

        sign_in(browser, wait)
        process_tickets(browser, wait)


@celery.task
def go(url: str) -> WebDriver:
    from app.commands.utils import go as go_to_url

    return go_to_url(url)
