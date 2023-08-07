from selenium.webdriver.remote.webdriver import WebDriver
import sqlalchemy as sa

from .celery_flask import celery_app as celery
from app import models as m
from app import db
from app import schema as s
from config import config
from app.logger import log

cfg = config()


@celery.task
def add(x: int, y: int) -> int:
    """Add two numbers"""
    log(log.INFO, "Add [%s] + [%s], task", x, y)
    return x + y


@celery.task
def bot() -> None:
    """Init bot"""
    from selenium.webdriver.support.wait import WebDriverWait
    from app.controllers.parser import crawler

    browser: WebDriver = browser
    wait = WebDriverWait(browser, cfg.BROWSER_TIMEOUT)
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    bot.status = s.BotStatus.UP
    bot.save()

    crawler(browser, wait)


@celery.task
def bot_go(url: str):
    from app.controllers import get_browser

    log(log.INFO, "BOT: Go to [%s]", url)

    assert url
    browser = get_browser()
    assert browser
    # browser: WebDriver = browser
    browser.get(url)
