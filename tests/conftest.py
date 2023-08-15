import datetime

import pytest
from flask import Flask
from flask.testing import FlaskClient
from pytest_mock import MockerFixture

from app import create_app, db
from app import models as m
from app.logger import log
from tests.utils import register


@pytest.fixture()
def app(mocker: MockerFixture):
    import os

    os.environ["APP_ENV"] = "testing"

    def start_bot(
        is_booking: bool = False,
        start_date: datetime.date | None = None,
        end_date: datetime.date | None = None,
    ):
        log(log.INFO, "BOT: Start - %s, %s, %s", is_booking, start_date, end_date)

    mocker.patch("app.controllers.start_bot", start_bot)
    mocker.patch("app.controllers.bot.start_bot", start_bot)

    app = create_app("testing")
    app.config.update(
        {
            "TESTING": True,
            "DEFAULT_PAGE_SIZE": 8,
        }
    )

    yield app


@pytest.fixture()
def client(app: Flask):
    with app.test_client() as client:
        app_ctx = app.app_context()
        app_ctx.push()

        db.drop_all()
        db.create_all()
        register()

        yield client
        db.drop_all()
        app_ctx.pop()


@pytest.fixture()
def runner(app, client):
    from app import commands

    commands.init(app)

    yield app.test_cli_runner()


@pytest.fixture
def populate(client: FlaskClient):
    NUM_TEST_USERS = 100
    for i in range(NUM_TEST_USERS):
        m.User(
            username=f"user{i+1}",
            email=f"user{i+1}@mail.com",
            password="password",
        ).save(False)
    db.session.commit()
    yield client
