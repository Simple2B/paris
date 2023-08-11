from flask import (
    Blueprint,
    render_template,
)
from flask_login import login_required

from app import models as m
from app.database import db

bp = Blueprint("tasks", __name__, url_prefix="/tasks")


@bp.route("/", methods=["GET"])
@login_required
def index():
    query = m.Task.select()
    tasks = db.session.scalars(query).all()

    return render_template("task/index.html", tasks=tasks)


@bp.route("/buy/<int:ticket_date_id>", methods=["GET"])
@login_required
def buy(ticket_date_id: int):
    pass
