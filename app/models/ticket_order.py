from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin

from app import schema as s


class TicketOrder(db.Model, ModelMixin):
    __tablename__ = "tickets_order"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    ticket_date_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("tickets_date.id"), nullable=False
    )
    ticket_time_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("tickets_time.id"), nullable=False
    )
    amount: orm.Mapped[int] = orm.mapped_column(sa.Integer, nullable=False)
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("users.id"), nullable=False
    )
    status: orm.Mapped[s.OrderStatus] = orm.mapped_column(
        sa.Enum(s.OrderStatus),
        default=s.OrderStatus.NEW,
        server_default=s.OrderStatus.NEW.value,
    )

    @property
    def json(self):
        u = s.TicketOrder.from_orm(self)
        return u.json()
