import datetime
import random

from app import schema as s
from app import controllers as c


def get_random_tickets(date: datetime.date):
    """Get random tickets for date"""

    TIMES = (datetime.time(9, 30), datetime.time(19, 0))
    # get random int from 0 to 50
    total_tickets = random.randint(0, 50)
    if total_tickets == 0 or date == datetime.date.today():
        c.add_ticket_date(date, 0)
        return
    ticket_date = c.add_ticket_date(date, total_tickets)
    floors = {
        s.Floor.FIRST: {TIMES[0]: 0, TIMES[-1]: 0},
        s.Floor.SECOND: {TIMES[0]: 0, TIMES[-1]: 0},
    }
    for _ in range(total_tickets):
        # get random floor from s.Floor
        floor = random.choice(list(s.Floor))
        # get random time from TIMES
        time = random.choice(TIMES)
        floors[floor][time] += 1

    for floor, times in floors.items():
        for time, tickets in times.items():
            if tickets == 0:
                continue
            c.add_ticket_time(ticket_date, floor, time, tickets)
