from datetime import time

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin
from config import config

CFG = config()


class SchedulerConfig(db.Model, ModelMixin):
    __tablename__ = "scheduler_config"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    updated_at: orm.Mapped[sa.DateTime] = orm.mapped_column(
        sa.DateTime,
        default=sa.func.now(),
        onupdate=sa.func.now(),
    )

    evening_start: orm.Mapped[sa.Time] = orm.mapped_column(
        sa.Time,
        default=time(hour=CFG.EVENING_START_HOUR, minute=CFG.EVENING_START_MINUTE),
    )

    morning_start: orm.Mapped[sa.Time] = orm.mapped_column(
        sa.Time,
        default=time(hour=CFG.MORNING_START_HOUR, minute=CFG.MORNING_START_MINUTE),
    )

    def __repr__(self):
        return f"<{self.id}:{self.evening_start}:{self.morning_start}>"
