from selenium.webdriver.remote.webdriver import WebDriver

from .celery_flask import celery_app as celery
from config import config
from app.logger import log

cfg = config()


@celery.task
def add(x: int, y: int) -> int:
    """Add two numbers"""
    log(log.INFO, "Add [%s] + [%s], task", x, y)
    return x + y


@celery.task
def processing() -> None:
    """Init bot"""
    from selenium.webdriver.support.wait import WebDriverWait
    from app.controllers import bot_crawler

    browser: WebDriver = browser
    wait = WebDriverWait(browser, cfg.BROWSER_TIMEOUT)

    bot_crawler(browser, wait)


@celery.task
def bot_go(url: str):
    from app.controllers import get_browser

    log(log.INFO, "BOT: Go to [%s]", url)

    assert url
    browser = get_browser()
    assert browser
    # browser: WebDriver = browser
    browser.get(url)
