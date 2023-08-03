from pydantic import BaseModel


class Bot(BaseModel):
    id: int
    status: str

    class Config:
        orm_mode = True
