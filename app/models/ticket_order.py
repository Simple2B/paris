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
    message: orm.Mapped[str] = orm.mapped_column(sa.String(127), default="")
    current_user_id: orm.Mapped[int] = orm.mapped_column(sa.Integer, nullable=False)
    status: orm.Mapped[s.Status] = orm.mapped_column(
        sa.Enum(s.Status),
        default=s.Status.IN_PROGRESS,
        server_default=s.Status.IN_PROGRESS.value,
    )

    @property
    def json(self):
        u = s.TicketOrder.from_orm(self)
        return u.json()
