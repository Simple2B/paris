import datetime

from flask import flash

from app import scheduler
from config import config
from app.controllers.bot import start_bot
from app import schema as s
from app.logger import log

CFG = config()


def add_task_booking(date: datetime.date, time: datetime.time, month: str):
    jobs = scheduler.get_jobs()

    month_index = [mn.name for mn in s.Month].index(month.upper()) + 1
    start_date = datetime.date(year=date.year, month=month_index, day=1)

    # scheduler should add job if only there is no job with the same date and time
    for job in jobs:
        if job.name == CFG.BOOKING_JOB_NAME:
            if job.next_run_time.date() == date and job.next_run_time.time() == time:
                flash("This time slot already booked", "danger")
                log(log.WARNING, "This time slot already booked")
                return

    scheduler.add_job(
        start_bot,
        "date",
        run_date=datetime.datetime.combine(date, time),
        name=CFG.BOOKING_JOB_NAME,
        args=[True, start_date, start_date + datetime.timedelta(weeks=4)],
    )
    log(log.INFO, "Booking job added at %s - %s: %s", date, time, month)


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
