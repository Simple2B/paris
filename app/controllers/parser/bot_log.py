import sqlalchemy as sa

from app import models as m
from app import db
from app import schema as s
from app.logger import log


def bot_log(message: str, level: s.BotLogLevel = s.BotLogLevel.INFO):
    with db.begin() as session:
        bot = session.scalar(sa.select(m.Bot))
        assert bot
        session.add(
            m.BotLog(
                message=message,
                bot_id=bot.id,
                level=level,
            )
        )
    log_level = {
        s.BotLogLevel.DEBUG: log.INFO,
        s.BotLogLevel.INFO: log.INFO,
        s.BotLogLevel.WARNING: log.WARNING,
        s.BotLogLevel.ERROR: log.ERROR,
        s.BotLogLevel.CRITICAL: log.CRITICAL,
    }[level]
    log(log_level, "BOT: %s: %s", level.name, message)
