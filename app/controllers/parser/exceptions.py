import sqlalchemy as sa

from app import models as m
from app import db
from app import schema as s


class ParserError(Exception):
    def __init__(self, message: str):
        self.message = message


class ParserCanceled(Exception):
    def __init__(self, message: str):
        self.message = message


def raise_if_canceled():
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if bot.status == s.BotStatus.STOP:
        raise ParserCanceled("Parser was canceled")


# decorator for check if parser was canceled
def check_canceled(func):
    def wrapper(*args, **kwargs):
        raise_if_canceled()

        return func(*args, **kwargs)

    return wrapper
