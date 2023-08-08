import enum

from pydantic import BaseModel


class BotStatus(enum.Enum):
    DOWN: str = "DOWN"
    START: str = "START"
    UP: str = "UP"
    STOP: str = "STOP"
    WARNING: str = "WARNING"
    ERROR: str = "ERROR"
    CRITICAL: str = "CRITICAL"
    CLEAN: str = "CLEAN"  # clean up WARNING/ERROR/CRITICAL status


class BotLogLevel(enum.Enum):
    DEBUG: str = "DEBUG"
    INFO: str = "INFO"
    WARNING: str = "WARNING"
    ERROR: str = "ERROR"
    CRITICAL: str = "CRITICAL"


class Bot(BaseModel):
    id: int
    status: BotStatus

    class Config:
        orm_mode = True
