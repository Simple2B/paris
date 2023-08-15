import enum
import datetime

from pydantic import BaseModel


class TaskStatus(enum.Enum):
    AWAITING = "AWAITING"
    PROCESSING = "PROCESSING"
    ERROR = "ERROR"
    DONE = "DONE"


class Task(BaseModel):
    name: str
    created_at: datetime.datetime
    status: TaskStatus

    class Config:
        orm_mode = True
