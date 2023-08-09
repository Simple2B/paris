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
    from app.controllers.selenium import get_browser

    browser = get_browser()
    assert browser
    wait = WebDriverWait(browser, cfg.BROWSER_TIMEOUT)
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if not bot:
        log(log.WARNING, "BOT: Not found - create new")
        bot = m.Bot().save()
    bot.status = s.BotStatus.UP
    bot.save()

    crawler(browser, wait, bot)

    log(log.INFO, "BOT: Goes DOWN")
    bot.status = s.BotStatus.DOWN
    bot.save()


@celery.task
def bot_go(url: str):
    from app.controllers.selenium import get_browser

    log(log.INFO, "BOT: Go to [%s]", url)

    assert url
    browser = get_browser()
    log(log.INFO, "BOT: browser instance [%s]", browser)
    assert browser
    browser.get(url)


@celery.on_after_configure.connect  # type: ignore
def setup_celery(*args, **kwargs):
    """Setup celery"""
    log(log.INFO, "Celery: setup")
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if not bot:
        log(log.WARNING, "BOT: Not found - create new")
        bot = m.Bot().save()
    else:
        log(log.INFO, "BOT: Found [%s]. Reset it", bot)
        bot.status = s.BotStatus.DOWN
        bot.save()
