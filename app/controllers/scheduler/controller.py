import datetime

from flask import flash

from app import scheduler
from config import config
from app.controllers.bot import start_bot
from app import schema as s
from app.logger import log

CFG = config()


def add_task_booking(
    date: datetime.date,
    time: datetime.time,
    month: str | None = None,
    booking_day: datetime.date | None = None,
):
    """Creating or updating booking job"""
    job = scheduler.get_job(CFG.BOOKING_JOB_NAME)
    if job:
        scheduler.remove_job(job.id)

    if month:
        month_index = [mn.name for mn in s.Month].index(month.upper()) + 1
        start_date = datetime.date(year=date.year, month=month_index, day=1)
        if start_date < datetime.date.today():
            start_date = datetime.date(year=date.year + 1, month=month_index, day=1)
        args = [True, start_date, start_date + datetime.timedelta(weeks=4)]
        log(log.INFO, "Booking job added at %s - %s: %s", date, time, month)

    elif booking_day:
        start_date = booking_day
        args = [True, start_date, start_date + datetime.timedelta(days=1)]
        log(log.INFO, "Booking job added at %s - %s: %s", date, time, booking_day)

    else:
        log(log.WARNING, "Booking job not added: wrong params")
        return

    scheduler.add_job(
        start_bot,
        "date",
        id=CFG.BOOKING_JOB_NAME,
        run_date=datetime.datetime.combine(date, time),
        name=CFG.BOOKING_JOB_NAME,
        args=args,
    )


def get_tasks():
    jobs = scheduler.get_jobs()
    tasks = []
    for job in jobs:
        # if job.name == CFG.BOOKING_JOB_NAME:
        tasks.append(
            s.Task(
                id=job.id,
                name=job.name,
                next_run_time=job.next_run_time,
                status=s.TaskStatus.AWAITING,
                trigger=str(job.trigger),
            )
        )
    return tasks


def delete_task(id: str):
    if scheduler.get_job(id):
        scheduler.remove_job(id)
        flash("Job deleted", "success")
    else:
        flash("Job not found", "danger")
