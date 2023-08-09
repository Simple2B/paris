from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db
from app.logger import log


bp = Blueprint("ticket", __name__, url_prefix="/ticket")


@bp.route("/", methods=["GET"])
@login_required
def index():
    log(log.INFO, "Ticket index")
    q = request.args.get("q", type=str, default=None)
    query = m.TicketDate.select().order_by(m.TicketDate.date)
    count_query = sa.select(sa.func.count()).select_from(m.TicketDate)
    total = db.session.scalar(count_query)
    if not total:
        total = 0
    pagination = create_pagination(total)
    tickets = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()
    return render_template(
        "ticket/index.html",
        tickets=tickets,
        page=pagination,
        search_query=q,
    )
