import datetime

import sqlalchemy as sa
from selenium.common.exceptions import InvalidSessionIdException

from app import db
from app import models as m
from app import schema as s
from app.controllers.parser.web_elements import click_new_choice
from app.controllers.parser.bot_log import bot_log
from app.controllers.parser.utils import wait_until_start, sign_in
from app.logger import log
from config import config

from .celery_flask import celery_app as celery

cfg = config()


@celery.task
def add(x: int, y: int) -> int:
    """Add two numbers"""
    log(log.INFO, "Add [%s] + [%s], task", x, y)
    return x + y


@celery.task
def bot(
    is_booking: bool,
    start_date: datetime.date | None = None,
    end_date: datetime.date | None = None,
    tickets: int = cfg.TICKETS_PER_DAY,
    start_time: datetime.time | None = None,
):
    """Init bot"""
    start_time = (
        datetime.time(
            minute=datetime.datetime.now().minute, hour=datetime.datetime.now().hour
        )
        if not start_time
        else start_time
    )

    from selenium.common.exceptions import WebDriverException
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
    while True:
        try:
            sign_in(browser, wait)
            click_new_choice(wait)
            if is_booking:
                wait_until_start(start_time, browser, wait)

            crawler(
                browser,
                wait,
                start_date=start_date,
                end_date=end_date,
                is_booking=is_booking,
                max_tickets=tickets,
                start_time=start_time,
            )
            break
        except WebDriverException as e:
            bot_log(f"WebDriverException: {type(e)}", s.BotLogLevel.CRITICAL)
            get_browser(force_reconnect=False)
            bot_log("Reconnecting browser...")
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
