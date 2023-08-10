import datetime

from app import models as m
from app import schema as s
from app import db
from .bot_log import bot_log


def update_date_tickets_count(tickets_count: int, date: datetime.date) -> int:
    """Update or create new TicketDate object

    Args:
        tickets_count (int): total_count of tickets
        date (datetime.date): date of tickets
    """
    with db.begin() as session:
        ticket_date: m.TicketDate = session.scalar(
            m.TicketDate.select().where(m.TicketDate.date == date)
        )
        if not ticket_date:
            bot_log(f"Creating new TicketDate - [{date}]")
            ticket_date = m.TicketDate(date=date, total_tickets=tickets_count)
            session.add(ticket_date)
        else:
            bot_log(f"Updating existing TicketDate - [{date}]")
            ticket_date.total_tickets = tickets_count
        if not tickets_count:
            bot_log(f"Delete all tickets for day - [{ticket_date.date}]")
            session.execute(
                m.TicketTime.delete().where(
                    m.TicketTime.ticket_date_id == ticket_date.id
                )
            )
        return ticket_date.id


def date_ticket_exist(date: datetime.date) -> bool:
    """returns True if DateTicket with this date exist

    Args:
        date (datetime.date): ticket date

    Returns:
        bool: True if exist, False otherwise
    """
    with db.begin() as session:
        ticket_date: m.TicketDate = session.scalar(
            m.TicketDate.select().where(m.TicketDate.date == date)
        )
        return bool(ticket_date)


def delete_date_tickets(date: datetime.date):
    """delete existing DateTicket

    Args:
        date (datetime.date): ticket date

    """
    with db.begin() as session:
        ticket_date: m.TicketDate = session.scalar(
            m.TicketDate.select().where(m.TicketDate.date == date)
        )

        bot_log(f"Delete all tickets for day - [{ticket_date.date}]")
        session.execute(
            m.TicketTime.delete().where(m.TicketTime.ticket_date_id == ticket_date.id)
        )
        session.execute(m.TicketTime.delete().where(m.TicketDate.id == ticket_date.id))


def update_ticket_time(
    ticket_date: m.TicketDate,
    floor: s.Floor,
    time: datetime.time,
    count: int,
):
    with db.begin() as session:
        if not count:
            bot_log(f"Delete TicketTime - [{ticket_date.date}] - [{time}] - [{floor}]")
            session.execute(
                m.TicketTime.delete()
                .where(m.TicketTime.ticket_date_id == ticket_date.id)
                .where(m.TicketTime.clock == time)
                .where(m.TicketTime.floor == floor)
            )
        else:
            ticket_time = session.scalar(
                m.TicketTime.select()
                .where(m.TicketTime.ticket_date_id == ticket_date.id)
                .where(m.TicketTime.clock == time)
                .where(m.TicketTime.floor == floor)
            )
            if not ticket_time:
                bot_log(
                    f"Creating new TicketTime - [{ticket_date.date}] - [{time}] - [{floor}]"
                )
                ticket_time = m.TicketTime(
                    ticket_date_id=ticket_date.id,
                    clock=time,
                    floor=floor,
                    tickets=count,
                )
                session.add(ticket_time)
            else:
                bot_log(
                    f"Updating existing TicketTime - [{ticket_date.date}] - [{time}] - [{floor}]"
                )
                ticket_time.tickets = count
