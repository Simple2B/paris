import datetime
import click
from flask import Flask
import sqlalchemy as sa
from sqlalchemy import orm
from app import models as m
from app import db, forms
from app import schema as s
from app import controllers as c
from config import config

cfg = config()


def init(app: Flask):
    # flask cli context setup
    @app.shell_context_processor
    def get_context():
        """Objects exposed here will be automatically available from the shell."""
        return dict(app=app, db=db, m=m, f=forms, s=s, sa=sa, orm=orm, c=c)

    if app.config["ENV"] != "production":

        @app.cli.command()
        @click.option("--count", default=100, type=int)
        def db_populate(count: int):
            """Fill DB by dummy data."""
            from tests.db import populate

            populate(count)
            print(f"DB populated by {count} instancies")

    @app.cli.command("create-admin")
    def create_admin():
        """Create super admin account"""
        query = m.User.select().where(m.User.email == app.config["ADMIN_EMAIL"])
        if db.session.execute(query).first():
            print(f"User with e-mail: [{app.config['ADMIN_EMAIL']}] already exists")
            return
        m.User(
            username=app.config["ADMIN_USERNAME"],
            email=app.config["ADMIN_EMAIL"],
            password=app.config["ADMIN_PASSWORD"],
        ).save()
        print("admin created")

    @app.cli.command()
    @click.option("--days", default=60, type=int)
    def db_tickets_populate(days: int):
        """Fill DB by dummy data."""

        from .test_tickets_gen import get_random_tickets

        TODAY = datetime.date.today()
        for i in range(0, days):
            date = TODAY + datetime.timedelta(days=i)
            get_random_tickets(date)

    @app.cli.command()
    @click.argument("url")
    def go(url: str):
        """Go to url"""
        c.go(url)
