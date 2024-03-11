import datetime

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
from app import schema as s
from app import scheduler
from app.forms import ScheduleForm
from config import config

CFG = config()
ALL_MONTHS = [mn.value for mn in s.Month]


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
    job = scheduler.get_job(job_id=CFG.BOOKING_JOB_NAME)

    month = datetime.date.today().month
    months = list()
    for i in range(CFG.MONTHS_NEXT_SELECTOR_COUNT):
        months += [ALL_MONTHS[(month + i) % 12]]

    for bot_log in bot_logs:
        bot_log.created_at = bot_log.created_at + datetime.timedelta(hours=1)

    if job:
        scheduler_date = job.next_run_time.date().strftime("%m/%d/%Y")
        time_data = job.next_run_time.time()
        scheduler_date = datetime.datetime.strptime(
            f"{scheduler_date} {time_data.hour}:{time_data.minute}",
            "%m/%d/%Y %H:%M",
        )
        scheduler_date = scheduler_date + datetime.timedelta(hours=1)
        scheduler_time = scheduler_date.strftime("%I:%M %p")
        scheduler_date = time_data.strftime("%m/%d/%Y")

        scheduler_day = job.args[2].strftime("%m/%d/%Y")

        return render_template(
            "bot/index.html",
            bot=c.get_bot(),
            bot_logs=bot_logs,
            page=pagination,
            scheduler_date=job.next_run_time.date().strftime("%m/%d/%Y"),
            scheduler_time=scheduler_time,
            scheduler_day=scheduler_day,
            months=months,
            tickets=job.args[3],
        )
    return render_template(
        "bot/index.html",
        bot=c.get_bot(),
        bot_logs=bot_logs,
        page=pagination,
        months=months,
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
        "Scheduling at %s - %s: %s (%s tickets)",
        schedule_form.day.data,
        schedule_form.time.data,
        schedule_form.booking_day.data,
        schedule_form.tickets.data,
    )
    flash(
        f"Scheduling at {schedule_form.day.data} - {schedule_form.time.data}: {schedule_form.booking_day.data} ({schedule_form.tickets.data} tickets)",  # noqa: E501
        "success",
    )
    c.add_task_booking(
        schedule_form.day.data,
        datetime.time(
            hour=abs(schedule_form.time.data.hour - 1),
            minute=schedule_form.time.data.minute,
        ),
        booking_day=schedule_form.booking_day.data,
        tickets=schedule_form.tickets.data,
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
