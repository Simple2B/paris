from celery import Celery

from .celery_flask import celery_app as celery
from config import config
from app.logger import log

configuration = config()


@celery.task
def add(x: int, y: int) -> int:
    """Add two numbers"""
    log(log.INFO, "Add [%s] + [%s], task", x, y)
    return x + y


@celery.task
def init_bot():
    """Init bot"""
    from selenium.webdriver.remote.webdriver import WebDriver
    from selenium.webdriver.support.wait import WebDriverWait
    from app.controllers import get_browser, sign_in, process_tickets

    for browser in get_browser():
        browser: WebDriver = browser
        wait = WebDriverWait(browser, 4)

        sign_in(browser, wait)
        process_tickets(browser, wait)


@celery.on_after_configure.connect
def setup_celery(sender: Celery, **kwargs):
    log(log.INFO, "Setup celery from [%s]", configuration.REDIS_URL)
    # sender.add_periodic_task(
    #     20,
    #     init_bot.s(),
    #     name="Bot initialization",
    # )
