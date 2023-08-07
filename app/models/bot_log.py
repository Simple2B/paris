from datetime import datetime

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .bot import Bot


class BotLog(db.Model, ModelMixin):
    __tablename__ = "bot_logs"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    bot_id: orm.Mapped[int] = orm.mapped_column(sa.Integer, sa.ForeignKey("bot.id"))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    level: orm.Mapped[s.BotLogLevel] = orm.mapped_column(
        sa.Enum(s.BotLogLevel),
        default=s.BotLogLevel.INFO.value,
    )
    message: orm.Mapped[str] = orm.mapped_column(sa.String(256), default="")

    bot: orm.Mapped[Bot] = orm.relationship("Bot", backref="bot_logs")

    def __repr__(self):
        return f"<{self.id}:{self.level.name}:{self.message}>"
