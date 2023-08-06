from datetime import time

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .ticket_date import TicketDate


class TicketTime(db.Model, ModelMixin):
    __tablename__ = "tickets_time"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    ticket_date_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("tickets_date.id"), nullable=False
    )
    clock: orm.Mapped[time] = orm.mapped_column(sa.Time, nullable=False)
    floor: orm.Mapped[s.Floor] = orm.mapped_column(
        sa.Enum(s.Floor), nullable=False, server_default=s.Floor.FIRST
    )
    tickets: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=0)

    ticket_date: orm.Mapped[TicketDate] = orm.relationship(
        "TicketDate", backref="tickets_time"
    )
