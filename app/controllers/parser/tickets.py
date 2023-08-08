import datetime

import sqlalchemy as sa

from app import models as m
from app import db
from app.logger import log


def update_date_tickets_count(tickets_count: int, date: datetime.date) -> m.TicketDate:
    """Update or create new TicketDate object

    Args:
        tickets_count (int): total_count of tickets
        date (datetime.date): date of tickets
    """
    ticket_date: m.TicketDate = db.session.scalar(
        sa.select(m.TicketDate).where(m.TicketDate.date == date)
    )
    if not ticket_date:
        log(log.INFO, "Creating new TicketDate - [%s]", date)
        ticket_date = m.TicketDate(date=date, total_tickets=tickets_count).save()
    else:
        log(log.INFO, "Updating existing TicketDate - [%s]", date)
        ticket_date.total_tickets = tickets_count
        ticket_date.save()
    return ticket_date
