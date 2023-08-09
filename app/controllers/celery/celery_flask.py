import flask
from celery import Celery

from config import config
from app.logger import log
from app import create_app

settings = config()

log(log.INFO, "REDIS_URL: [%s]", settings.REDIS_URL)


class FlaskCelery(Celery):
    def __init__(self, *args, **kwargs):
        super(FlaskCelery, self).__init__(*args, **kwargs)
        self.patch_task()
        self.init_app()

        if "app" in kwargs:
            self.init_app(kwargs["app"])  # type: ignore

    def patch_task(self):
        TaskBase = self.Task
        _celery = self

        class ContextTask(TaskBase):
            abstract = True

            def __call__(self, *args, **kwargs):
                if flask.has_app_context():
                    return TaskBase.__call__(self, *args, **kwargs)
                else:
                    with _celery.app.app_context():
                        return TaskBase.__call__(self, *args, **kwargs)

        self.Task = ContextTask

    def init_app(self):
        app = create_app()
        self.app = app

        configuration = config("development")
        self.conf.broker_url = configuration.REDIS_URL  # type: ignore
        self.conf.result_backend = configuration.REDIS_URL  # type: ignore
        self.conf.broker_connection_retry_on_startup = True
        self.__reset_bot()

    def __reset_bot(self):
        """Setup celery"""
        import sqlalchemy as sa
        from app import models as m
        from app import db
        from app import schema as s

        log(log.INFO, "Celery: setup")
        bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
        if not bot:
            log(log.WARNING, "BOT: Not found - create new")
            bot = m.Bot().save()
        else:
            log(log.INFO, "BOT: Found [%s]. Reset it", bot)
            bot.status = s.BotStatus.DOWN
            bot.save()


celery_app = FlaskCelery()
