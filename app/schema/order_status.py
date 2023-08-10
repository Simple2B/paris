import enum


class Status(enum.Enum):
    IN_PROGRESS: str = "IN PROGRESS"
    DONE: str = "DONE"
    CANCELED: str = "CANCELED"
