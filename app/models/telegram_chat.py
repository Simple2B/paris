from datetime import datetime

from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin


class TelegramChat(db.Model, ModelMixin):  # type: ignore
    __tablename__ = "telegram_chats"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    chat_id: orm.Mapped[int] = orm.mapped_column(sa.Integer, sa.ForeignKey("bot.id"))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    title: orm.Mapped[str] = orm.mapped_column(sa.String(255))
    is_deleted: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    def __repr__(self):
        return f"<{self.id}:{self.level.name}:{self.message}>"
