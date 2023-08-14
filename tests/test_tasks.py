import datetime

from flask.testing import FlaskClient
from tests.utils import login


def test_book_tickets(populate: FlaskClient):
    login(populate)

    start_date = datetime.date.today()
    end_date = start_date + datetime.timedelta(weeks=4)
    response = populate.post(
        "/tasks/booking_period",
        data={
            "start": start_date.strftime("%m/%d/%Y"),
            "end": end_date.strftime("%m/%d/%Y"),
        },
        follow_redirects=True,
    )

    assert response.status_code == 200

    date = start_date + datetime.timedelta(days=1)
    response = populate.post(
        "/tasks/booking_day",
        data={
            "day": date.strftime("%m/%d/%Y"),
        },
        follow_redirects=True,
    )

    assert response.status_code == 200

    date = start_date - datetime.timedelta(days=5)
    response = populate.post(
        "/tasks/booking_day",
        data={
            "day": date.strftime("%m/%d/%Y"),
        },
        follow_redirects=True,
    )

    assert "Date must be in the future" in response.text
