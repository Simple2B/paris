from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin
from app import schema as s


class Bot(db.Model, ModelMixin):
    __tablename__ = "bot"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    status: orm.Mapped[s.BotStatus] = orm.mapped_column(
        sa.Enum(s.BotStatus), default=s.BotStatus.DOWN.value
    )
    updated_at: orm.Mapped[sa.DateTime] = orm.mapped_column(
        sa.DateTime,
        default=sa.func.now(),
        onupdate=sa.func.now(),
    )
    message: orm.Mapped[str] = orm.mapped_column(sa.String(256), default="")
    task_id: orm.Mapped[str] = orm.mapped_column(sa.String(64), default=0)

    def __repr__(self):
        return f"<{self.id}:{self.status.name}>"

    @property
    def json(self):
        return s.Bot.from_orm(self).json()
