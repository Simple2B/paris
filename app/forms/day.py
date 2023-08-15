import datetime

from flask_wtf import FlaskForm
from wtforms import ValidationError, DateField
from wtforms.validators import DataRequired


class DayForm(FlaskForm):
    day = DateField("day", validators=[DataRequired()], format="%m/%d/%Y")

    def validate_day(form, field):
        if field.data < datetime.date.today():
            raise ValidationError("Date must be in the future")
