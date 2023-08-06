from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


bp = Blueprint("ticket", __name__, url_prefix="/ticket")


@bp.route("/", methods=["GET"])
@login_required
def index():
    q = request.args.get("q", type=str, default=None)
    query = m.TicketDate.select().order_by(m.TicketDate.date)
    count_query = sa.select(sa.func.count()).select_from(m.TicketDate)
    # if q:
    #     query = (
    #         m.User.select()
    #         .where(m.User.username.like(f"{q}%") | m.User.email.like(f"{q}%"))
    #         .order_by(m.User.id)
    #     )
    #     count_query = (
    #         sa.select(sa.func.count())
    #         .where(m.User.username.like(f"{q}%") | m.User.email.like(f"{q}%"))
    #         .select_from(m.User)
    #     )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "ticket/index.html",
        tickets=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
    )
