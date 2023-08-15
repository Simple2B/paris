from datetime import datetime

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin
from app import schema as s


class JobDone(db.Model, ModelMixin):
    __tablename__ = "job_done"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    level: orm.Mapped[s.BotLogLevel] = orm.mapped_column(
        sa.Enum(s.BotLogLevel),
        default=s.BotLogLevel.INFO.value,
    )
    message: orm.Mapped[str] = orm.mapped_column(sa.String(256), default="")

    def __repr__(self):
        return f"<{self.id}:{self.level.name}:{self.message}>"
