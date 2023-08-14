import datetime

from flask_wtf import FlaskForm
from wtforms import ValidationError, DateField
from wtforms.validators import DataRequired


class PeriodForm(FlaskForm):
    start = DateField("start", validators=[DataRequired()], format="%m/%d/%Y")
    end = DateField("end", validators=[DataRequired()], format="%m/%d/%Y")

    def validate_end(form, field):
        if field.data < form.start.data:
            raise ValidationError("End date must be after start date")

    def validate_start(form, field):
        if field.data > form.end.data:
            raise ValidationError("Start date must be before end date")
        if field.data < datetime.date.today():
            raise ValidationError("Start date must be in the future")
