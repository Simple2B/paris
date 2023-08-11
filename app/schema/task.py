import enum


class TaskStatus(enum.Enum):
    AWAITING = "AWAITING"
    PROCESSING = "PROCESSING"
    ERROR = "ERROR"
    DONE = "DONE"
