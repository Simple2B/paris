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
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if not bot:
        log(log.WARNING, "BOT: Not found")
        bot = m.Bot().save()
    if bot.status != s.BotStatus.DOWN:
        log(log.WARNING, "BOT: Wrong status [%s]", bot.status.name)
        flash(f"BOT: Wrong status [{bot.status.name}]", "danger")
        return

    today = datetime.date.today()
    tickets = db.session.scalars(
        sa.select(m.TicketDate)
        .where(m.TicketDate.date < today)
        .order_by(m.TicketDate.date)
    ).all()

    for ticket in tickets:
        log(log.INFO, "Deleting old ticket [%s]", ticket.date)
        db.session.delete(ticket)

    bot.status = s.BotStatus.START
    bot.message = "Initialization"
    bot.save()
    task = bot_task.delay()
    bot.task_id = task.id
    bot.save()


def stop_bot():
    log(log.INFO, "BOT: Stop")
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    assert bot
    if bot.status != s.BotStatus.UP:
        log(log.WARNING, "BOT: Wrong status [%s]", bot.status.name)
        flash(f"BOT: Wrong status [{bot.status.name}]", "danger")
        return

    bot.message = "Shutting down"
    bot.status = s.BotStatus.STOP
    bot.save()
