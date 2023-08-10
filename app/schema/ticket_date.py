from datetime import datetime
from pydantic import BaseModel, Field


class TicketDateSchema(BaseModel):
    id: int
    date: datetime
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    total_tickets: int = Field(alias="totalTickets")

    class Config:
        orm_mode = True
