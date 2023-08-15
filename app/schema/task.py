import enum
import datetime

from pydantic import BaseModel


class TaskStatus(enum.Enum):
    AWAITING = "AWAITING"
    PROCESSING = "PROCESSING"
    ERROR = "ERROR"
    DONE = "DONE"


class Task(BaseModel):
    id: str
    name: str
    next_run_time: datetime.datetime
    status: TaskStatus
    trigger: str

    class Config:
        orm_mode = True
