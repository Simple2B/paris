import datetime

from flask_wtf import FlaskForm
from wtforms import ValidationError, DateField, TimeField, IntegerField
from wtforms.validators import DataRequired

from config import config

CFG = config()


class ScheduleForm(FlaskForm):
    day = DateField("day", validators=[DataRequired()], format="%m/%d/%Y")
    # time format is HH:MM pm/am
    time = TimeField("time", validators=[DataRequired()], format="%I:%M %p")
    booking_day = DateField(
        "booking_day", validators=[DataRequired()], format="%m/%d/%Y"
    )
    tickets = IntegerField("tickets", validators=[DataRequired()], default=CFG.TICKETS_PER_DAY)

    def validate_day(form, field):
        if field.data < datetime.date.today():
            raise ValidationError("Date must be in the future")

    def validate_time(form, field):
        # date and time should be in the future
        if (
            form.day.data == datetime.date.today()
            and field.data < datetime.datetime.now().time()
        ):
            raise ValidationError("Time must be in the future")

    def validate_booking_day(form, field):
        if field.data < datetime.date.today():
            raise ValidationError("Date must be in the future")

        if form.day.data and field.data < form.day.data:
            raise ValidationError("Booking date must be after the start date")

    def validate_tickets(form, field):
        if field.data < 1:
            raise ValidationError("Tickets must be greater than 0")
