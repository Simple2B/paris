from flask import (
    Blueprint,
    render_template,
    redirect,
    url_for,
)
import sqlalchemy as sa

from flask_login import login_required
from app.logger import log
from app import models as m
from app import db
from app import controllers as c


bot_blueprint = Blueprint("bot", __name__, url_prefix="/bot")


@bot_blueprint.route("/", methods=["GET"])
@login_required
def index():
    log(log.INFO, "bot.index")
    # bot_logs = db.session.query(m.BotLog).order_by(sa.desc(m.BotLog.created_at)).limit(100)
    query = m.BotLog.select().order_by(sa.desc(m.BotLog.created_at))
    count_query = sa.select(sa.func.count()).select_from(m.BotLog)
    total = db.session.scalar(count_query)
    if not total:
        total = 0
    pagination = c.create_pagination(total)
    bot_logs = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()
    return render_template(
        "bot/index.html",
        bot=c.get_bot(),
        bot_logs=bot_logs,
        page=pagination,
    )


@bot_blueprint.route("/refresh", methods=["GET"])
@login_required
def refresh():
    log(log.INFO, "bot.refresh")
    c.refresh_bot()
    return redirect(url_for("bot.index"))


@bot_blueprint.route("/start", methods=["GET"])
@login_required
def start():
    log(log.INFO, "bot.start")
    c.start_bot()
    return redirect(url_for("bot.index"))


@bot_blueprint.route("/stop", methods=["GET"])
@login_required
def stop():
    log(log.INFO, "bot.stop")

    c.stop_bot()
    return redirect(url_for("bot.index"))


@bot_blueprint.route("/reset_log", methods=["GET"])
@login_required
def reset_log():
    c.reset_bot_log()
    return redirect(url_for("bot.index"))
