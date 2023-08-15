from datetime import time
from pydantic import BaseModel
from .base import Floor


class TicketTimeSchema(BaseModel):
    id: int
    clock: time
    floor: Floor

    class Config:
        orm_mode = True
