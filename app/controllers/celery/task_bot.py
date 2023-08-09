import sqlalchemy as sa

from .celery_flask import celery_app as celery
from app import models as m
from app import db
from app import schema as s
from config import config
from app.logger import log
from app.controllers.parser.bot_log import bot_log

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
    with db.begin() as session:
        bot = session.scalar(sa.select(m.Bot))
        if not bot:
            log(log.WARNING, "BOT: Not found - create new")
            bot = m.Bot()
            session.add(bot)
        bot.status = s.BotStatus.UP

    bot_log("Goes UP")
    crawler(browser, wait)

    bot_log("Goes DOWN")

    with db.begin() as session:
        bot = session.scalar(sa.select(m.Bot))
        assert bot
        bot.status = s.BotStatus.DOWN


@celery.task
def bot_go(url: str):
    from app.controllers.selenium import get_browser

    log(log.INFO, "BOT: Go to [%s]", url)

    assert url
    browser = get_browser()
    log(log.INFO, "BOT: browser instance [%s]", browser)
    assert browser
    browser.get(url)
