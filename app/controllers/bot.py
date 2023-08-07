import sqlalchemy as sa

from app import models as m
from app import db
from app import schema as s
from app.logger import log

from .celery.task_bot import bot as bot_task


def start_bot():
    log(log.INFO, "BOT: Start")
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if bot.status != s.BotStatus.DOWN:
        log(log.WARNING, "BOT: Wrong status [%s]", bot.status.name)
        return

    bot.status = s.BotStatus.START
    bot.save()
    task = bot_task.delay()
    bot.task_id = task.id
    bot.save()


def stop_bot():
    log(log.INFO, "BOT: Stop")
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if bot.status != s.BotStatus.UP:
        log(log.WARNING, "BOT: Wrong status [%s]", bot.status.name)
        return

    bot.status = s.BotStatus.STOP
    bot.save()
