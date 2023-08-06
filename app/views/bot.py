from flask import Blueprint
from flask_login import login_required
from celery.result import AsyncResult

from app.logger import log
from app.controllers.celery import init_bot as init_bot_task

bot_blueprint = Blueprint("bot", __name__, url_prefix="/bot")


@bot_blueprint.route("/", methods=["GET"])
@login_required
def init_bot() -> dict[str, object]:
    result = init_bot_task.delay()
    log(log.INFO, "Bot initialization task created with id [%s]", result.id)
    return {"task_id": result.id}


@bot_blueprint.route("/result/<id>", methods=["GET"])
@login_required
def task_result(id: str) -> dict[str, object]:
    result = AsyncResult(id)
    return {
        "ready": result.ready(),
        "successful": result.successful(),
        "value": result.result if result.ready() else None,
    }
