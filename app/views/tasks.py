import datetime

from flask import (
    Blueprint,
    redirect,
    request,
    flash,
    url_for,
    render_template,
)
from flask_login import login_required

from app.logger import log
from app import controllers as c
from app.forms import PeriodForm, DayForm

bp = Blueprint("tasks", __name__, url_prefix="/tasks")


def func():
    print("Hello world")


@bp.route("/", methods=["GET"])
@login_required
def index():
    log(log.INFO, "tasks.index")
    tasks = c.get_tasks()
    return render_template("task/index.html", tasks=tasks)


@bp.route("/delete", methods=["POST"])
@login_required
def delete():
    id = request.form["id"]
    c.delete_task(id)
    log(log.INFO, "tasks.delete")
    return redirect(url_for("tasks.index"))


@bp.route("/booking_period", methods=["POST"])
@login_required
def booking_period():
    period_form = PeriodForm()
    if not period_form.validate_on_submit():
        flash(period_form.errors, "danger")
        return redirect(url_for("tasks.index"))
    start = period_form.start.data
    end = period_form.end.data

    c.start_bot(is_booking=True, start_date=start, end_date=end)
    log(log.INFO, "Booking task sended")
    flash("Booking task sended", "success")

    return redirect(url_for("tasks.index"))


@bp.route("/booking_day", methods=["POST"])
@login_required
def booking_day():
    period_form = DayForm()
    if not period_form.validate_on_submit():
        flash(period_form.errors, "danger")
        return redirect(url_for("tasks.index"))

    start = period_form.day.data
    end = start + datetime.timedelta(days=1)

    c.start_bot(is_booking=True, start_date=start, end_date=end)
    log(log.INFO, "Booking task sended")
    flash("Booking task sended", "success")
    return redirect(url_for("tasks.index"))
