import datetime

from flask_wtf import FlaskForm
from wtforms import ValidationError, DateField, TimeField, StringField
from wtforms.validators import DataRequired

from app import schema as s


class ScheduleForm(FlaskForm):
    day = DateField("day", validators=[DataRequired()], format="%m/%d/%Y")
    # time format is HH:MM pm/am
    time = TimeField("time", validators=[DataRequired()], format="%I:%M %p")
    month = StringField("month", validators=[DataRequired()])

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

    def validate_month(form, field):
        if field.data.upper() not in [m.value for m in s.Month]:
            raise ValidationError("Wrong month")
