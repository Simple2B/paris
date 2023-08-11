from flask import (
    Blueprint,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user

from app import models as m
from app import forms as f
from app.logger import log


bp = Blueprint("ticket_order", __name__, url_prefix="/order")


@bp.route("/create", methods=["POST"])
@login_required
def create():
    form = f.TicketOrderForm()
    if form.validate_on_submit():
        order = m.TicketOrder(
            user_id=current_user.id,
            ticket_time_id=form.ticket_time_id.data,
            ticket_date_id=form.ticket_date_id.data,
            amount=form.amount.data,
        )
        order.save()
        log(log.INFO, "Ticket order submitted. Order: [%s]", order)
        flash("Ticket order added!", "success")
    else:
        log(log.ERROR, "Ticket order form validation failed. Form: [%s]", form)
        flash("Ticket order form validation failed!", "danger")

    return redirect(url_for("ticket.index"))
