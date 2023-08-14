from flask import (
    Blueprint,
    redirect,
    flash,
    request,
    url_for,
    render_template,
)
from flask_login import login_required

from app.logger import log
from app import controllers as c


bp = Blueprint("tasks", __name__, url_prefix="/tasks")


@bp.route("/", methods=["GET"])
@login_required
def index():
    return render_template("task/index.html", tasks=[])


@bp.route("/booking", methods=["POST"])
@login_required
def booking():
    start = request.form.get("start")
    end = request.form.get("end")
    if not start or not end:
        log(log.WARNING, "Booking task not sended")
        flash("Booking task not sended")
        return redirect(url_for("tasks.index"))

    c.start_bot()
    log(log.INFO, "Booking task sended")
    return redirect(url_for("tasks.index"))


@bp.route("/buy/<int:ticket_date_id>", methods=["GET"])
@login_required
def buy(ticket_date_id: int):
    pass
