from datetime import datetime

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin


class TicketDate(db.Model, ModelMixin):
    __tablename__ = "tickets_date"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime, nullable=False)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime, default=datetime.utcnow
    )
    updated_at: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime, default=None)
    total_tickets: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=0)
    first_floor: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=0)
    second_floor: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=0)
