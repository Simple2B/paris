import datetime

import sqlalchemy as sa

from .celery_flask import celery_app as celery
from app import models as m
from app import db
from app import schema as s
from config import config
from app.logger import log
from app.controllers.parser.bot_log import bot_log

from selenium.common.exceptions import InvalidSessionIdException

cfg = config()


@celery.task
def add(x: int, y: int) -> int:
    """Add two numbers"""
    log(log.INFO, "Add [%s] + [%s], task", x, y)
    return x + y


@celery.task
def bot(
    is_booking: bool,
    tickets: int = cfg.TICKETS_PER_DAY,
    start_date: datetime.date | None = None,
    end_date: datetime.date | None = None,
):
    """Init bot"""
    from selenium.webdriver.support.wait import WebDriverWait
    from app.controllers.parser import crawler
    from app.controllers.selenium import get_browser
    from selenium.common.exceptions import WebDriverException

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
    try:
        browser.execute_script("window.open('', '_blank')")
    except InvalidSessionIdException as e:
        bot_log(f"InvalidSessionIdException: {type(e)}", s.BotLogLevel.CRITICAL)
        bot_log("Reconnecting browser...")
        get_browser(force_reconnect=True)
        # c.reset_bot()
    # browser.switch_to.window(browser.window_handles[-1])

    windows_before = browser.window_handles[:-1]
    for window in windows_before:
        browser.switch_to.window(window)
        browser.close()

    browser.switch_to.window(browser.window_handles[0])

    bot_log("Goes UP")
    try:
        crawler(browser, wait, start_date, end_date, is_booking, max_tickets=tickets)
    except WebDriverException as e:
        bot_log(f"WebDriverException: {type(e)}", s.BotLogLevel.CRITICAL)
        get_browser(force_reconnect=True)
        # c.reset_bot()

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
