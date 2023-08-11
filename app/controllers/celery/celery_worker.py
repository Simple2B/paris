import datetime

from typing import Callable
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from apscheduler.job import Job
import sqlalchemy as sa

from app import create_app
from app import db
from app import models as m
from app.logger import log
from config import config
from .celery_flask import FlaskCelery
from .task import w30


class Worker(FlaskCelery):
    def __init__(self, *args, **kwargs):
        super(FlaskCelery, self).__init__(*args, **kwargs)
        self.patch_task()
        self.init_worker()

        if "app" in kwargs:
            self.init_worker(kwargs["app"])  # type: ignore

    def init_worker(self):
        app = create_app()
        self.app = app
        self.sched = BackgroundScheduler()
        self.sched.start()
        # debugging
        self.schedule_task(
            w30, datetime.datetime.now() + datetime.timedelta(seconds=10)
        )
        configuration = config()
        self.conf.broker_url = configuration.REDIS_URL  # type: ignore
        self.conf.result_backend = configuration.REDIS_URL  # type: ignore
        self.conf.broker_connection_retry_on_startup = True

    def schedule_task(self, task: Callable, datetime_job: datetime.datetime):
        if isinstance(datetime_job, datetime.datetime):
            trigger = CronTrigger(
                year=datetime_job.year,
                month=datetime_job.month,
                day=datetime_job.day,
                hour=datetime_job.hour,
                minute=datetime_job.minute,
                second=datetime_job.second,
            )
        else:
            log(log.ERROR, "trigger must be datetime.datetime")
            return

        job: Job = self.sched.add_job(
            func=task,
            trigger=trigger,
        )
        self.create_task(job, datetime_job)

    def create_task(self, job: Job, time: datetime.datetime):
        with db.begin() as session:
            if session.scalar(sa.select(m.Task).where(m.Task.job_id == job.id)):
                log(log.ERROR, f"Job {job.id} already exists")
                return

            task = m.Task(time=time, job_id=job.id, name=job.name)
            log(log.INFO, f"Creating job {job.id}")
            session.add(task)

    def update_task(self, job: Job, time: datetime.datetime):
        with db.begin() as session:
            task = session.scalar(sa.select(m.Task).where(m.Task.job_id == job.id))
            if not task:
                log(log.ERROR, f"Job {job.id} does not exist")
                return

            task.time = time
            log(log.INFO, f"Updating job {job.id} - time {time}")

    def update_cron_time(self, id: str, new_time: datetime.datetime):
        job = self.sched.get_job(id)
        self.update_job(job, new_time)
        trigger = CronTrigger(
            year=new_time.year,
            month=new_time.month,
            day=new_time.day,
            hour=new_time.hour,
            minute=new_time.minute,
            second=new_time.second,
        )
        job.reschedule(trigger)
        pass


celery = Worker()
