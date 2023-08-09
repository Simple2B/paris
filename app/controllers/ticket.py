import datetime

from app import models as m
from app import schema as s
from app import db

from app.logger import log


def add_ticket_date(date: datetime.date, ticket_count: int) -> m.TicketDate:
    """Add tickets to DB"""
    log(log.DEBUG, "Adding tickets to DB: [%s] - [%d]", date, ticket_count)
    return m.TicketDate(
        date=date,
        total_tickets=ticket_count,
    ).save()


def add_ticket_time(
    ticket_date: m.TicketDate,
    floor: s.Floor,
    time: datetime.time,
    count: int,
) -> m.TicketTime:
    """Add tickets to DB"""
    log(
        log.DEBUG,
        "Adding floor tickets to DB: [%s] - [%s] - [%s] - [%d]",
        ticket_date,
        time,
        floor,
        count,
    )
    return m.TicketTime(
        ticket_date_id=ticket_date.id,
        clock=time,
        floor=floor,
        tickets=count,
    ).save()


def delete_all_tickets():
    with db.begin() as session:
        session.execute(m.TicketTime.delete())
        session.execute(m.TicketDate.delete())
