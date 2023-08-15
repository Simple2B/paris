import flask
from celery import Celery

from config import config
from app import create_app

settings = config()


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

        configuration = config()
        self.conf.broker_url = configuration.REDIS_URL  # type: ignore
        self.conf.result_backend = configuration.REDIS_URL  # type: ignore
        self.conf.broker_connection_retry_on_startup = True


celery_app = FlaskCelery()
