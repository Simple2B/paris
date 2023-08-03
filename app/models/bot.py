from sqlalchemy import orm
import sqlalchemy as sa

from app.database import db
from .utils import ModelMixin
from app import schema as s


class Bot(db.Model, ModelMixin):
    __tablename__ = "bots"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    status: orm.Mapped[str] = orm.mapped_column(sa.String(64), default="offline")

    def __repr__(self):
        return f"<Bot {self.id}>"

    @property
    def json(self):
        return s.Bot.from_orm(self).json()
