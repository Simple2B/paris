import enum

from pydantic import BaseModel


class BotStatus(enum.Enum):
    DOWN = "DOWN"
    START = "START"
    UP = "UP"
    STOP = "STOP"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"
    CLEAN = "CLEAN"  # clean up WARNING/ERROR/CRITICAL status


class BotLogLevel(enum.Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class Bot(BaseModel):
    id: int
    status: BotStatus

    class Config:
        orm_mode = True
