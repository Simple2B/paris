import datetime

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin

from app import schema as s


class TicketDate(db.Model, ModelMixin):  # type: ignore
    __tablename__ = "tickets_date"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    date: orm.Mapped[datetime.date] = orm.mapped_column(sa.Date, nullable=False)
    created_at: orm.Mapped[datetime.datetime] = orm.mapped_column(
        sa.DateTime, default=datetime.datetime.utcnow
    )
    updated_at: orm.Mapped[datetime.datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.datetime.utcnow,
        onupdate=datetime.datetime.utcnow,
    )
    total_tickets: orm.Mapped[int] = orm.mapped_column(sa.Integer, default=0)

    @property
    def json(self):
        data = s.TicketDateSchema.from_orm(self)
        return data.json(by_alias=True)

    def __repr__(self):
        return f"<{self.id}:{self.date}:{self.total_tickets}>"
