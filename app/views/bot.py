from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
import sqlalchemy as sa

from flask_login import login_required
from app.logger import log
from app import models as m
from app import db
from app import controllers as c
from app.forms import ScheduleForm

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


@bot_blueprint.route("/schedule", methods=["POST"])
@login_required
def schedule():
    log(log.INFO, "bot.schedule")
    schedule_form = ScheduleForm()
    if not schedule_form.validate_on_submit():
        flash(schedule_form.errors, "danger")
        return redirect(url_for("bot.index"))
    log(
        log.INFO,
        "Scheduling at %s - %s: %s",
        schedule_form.day.data,
        schedule_form.time.data,
        schedule_form.month.data,
    )
    flash(
        f"Scheduling at {schedule_form.day.data} - {schedule_form.time.data}: {schedule_form.month.data}",
        "success",
    )
    c.add_task_booking(
        schedule_form.day.data, schedule_form.time.data, schedule_form.month.data
    )
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


@bot_blueprint.route("/reset", methods=["GET"])
@login_required
def reset():
    c.reset_bot()
    return redirect(url_for("bot.index"))
