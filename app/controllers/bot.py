import datetime

import sqlalchemy as sa
from flask import flash

from app import models as m
from app import db
from app import schema as s
from app.logger import log

from .celery.task_bot import bot as bot_task


def start_bot():
    log(log.INFO, "BOT: Start")
    with db.begin() as session:
        bot: m.Bot = session.scalar(sa.select(m.Bot))
        if not bot:
            log(log.WARNING, "BOT: Not found")
            bot = m.Bot()
            session.add(bot)
        elif bot.status != s.BotStatus.DOWN:
            log(log.WARNING, "BOT: Wrong status [%s]", bot.status.name)
            flash(f"BOT: Wrong status [{bot.status.name}]", "danger")
            return

        session.execute(
            sa.delete(m.TicketDate).where(m.TicketDate.date < datetime.date.today())
        )

        bot.status = s.BotStatus.START
        bot.message = "Initialization"

    # start bot task
    log(log.INFO, "BOT: Start task")
    with db.begin() as session:
        bot = session.scalar(sa.select(m.Bot))
        assert bot
        task = bot_task.delay()
        bot.task_id = task.id


def stop_bot():
    log(log.INFO, "BOT: Stop")
    with db.begin() as session:
        bot = session.scalar(sa.select(m.Bot))
        assert bot
        if bot.status != s.BotStatus.UP:
            log(log.WARNING, "BOT: Wrong status [%s]", bot.status.name)
            flash(f"BOT: Wrong status [{bot.status.name}]", "danger")
            return

        bot.message = "Shutting down"
        bot.status = s.BotStatus.STOP


def get_bot():
    log(log.INFO, "BOT: Get instance")
    bot = db.session.scalar(sa.select(m.Bot))
    if not bot:
        log(log.WARNING, "BOT: Not found")
        bot = m.Bot().save()
    return bot


def refresh_bot():
    log(log.INFO, "BOT: Refresh")
    with db.begin() as session:
        bot = session.scalar(sa.select(m.Bot))
        if not bot:
            log(log.WARNING, "BOT: Not found")
            bot = m.Bot()
            session.add(bot)
        return bot


def reset_bot_log():
    log(log.INFO, "BOT: Reset log")
    with db.begin() as session:
        session.execute(sa.delete(m.BotLog))
