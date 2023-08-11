from flask_wtf import FlaskForm
from wtforms import IntegerField, ValidationError
from wtforms.validators import DataRequired

from app import models as m
from app import db


class TicketOrderForm(FlaskForm):
    amount = IntegerField("amount", [DataRequired()])
    ticket_time_id = IntegerField("ticket_time_id", [DataRequired()])
    ticket_date_id = IntegerField("ticket_date_id", [DataRequired()])
    user_id = IntegerField("user_id", [DataRequired()])

    def validate_amount(self, field):
        ticket_time = db.session.get(m.TicketTime, self.ticket_time_id.data)

        if not ticket_time:
            raise ValidationError("There is no such ticket time")

        if ticket_time.tickets < field.data:
            raise ValidationError("There is no enough tickets for this time")
