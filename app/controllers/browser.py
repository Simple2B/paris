from app.logger import log
from .celery import bot_go


def go(url: str):
    """Go to url"""

    log(log.INFO, "Going to [%s]", url)
    bot_go.delay(url)
    # task.wait()
