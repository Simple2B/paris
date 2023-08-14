import os

from flask import Flask, render_template
from flask_login import LoginManager
from werkzeug.exceptions import HTTPException
from flask_migrate import Migrate
from flask_mail import Mail
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from apscheduler.schedulers.background import BackgroundScheduler


from app.logger import log
from .database import db

# instantiate extensions
login_manager = LoginManager()
migration = Migrate()
mail = Mail()
scheduler: BackgroundScheduler = BackgroundScheduler()


def create_app(environment="development"):
    from config import config
    from app.controllers.jinja_globals import form_hidden_tag
    from app.views import (
        main_blueprint,
        auth_blueprint,
        user_blueprint,
        bot_blueprint,
        ticket_blueprint,
        dashboard_blueprint,
        tasks_blueprint,
    )
    from app import models as m

    # Instantiate app.
    app = Flask(__name__)

    # Set app config.

    env = os.environ.get("APP_ENV", environment)
    configuration = config(env)
    app.config.from_object(configuration)
    configuration.configure(app)
    log(log.INFO, "Configuration: [%s]", configuration.ENV)

    JOB_STORES = {
        "default": SQLAlchemyJobStore(url=configuration.ALCHEMICAL_DATABASE_URL)
    }
    scheduler.configure(jobstores=JOB_STORES)
    scheduler.start()

    log(log.INFO, "Scheduler initialized")

    # Set up extensions.
    db.init_app(app)
    migration.init_app(app, db)
    login_manager.init_app(app)
    mail.init_app(app)

    # Register blueprints.
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(bot_blueprint)
    app.register_blueprint(ticket_blueprint)
    app.register_blueprint(dashboard_blueprint)
    app.register_blueprint(tasks_blueprint)

    app.jinja_env.globals["form_hidden_tag"] = form_hidden_tag

    # Set up flask login.
    @login_manager.user_loader
    def get_user(id: int):
        query = m.User.select().where(m.User.id == int(id))
        return db.session.scalar(query)

    login_manager.login_view = "auth.login"  # type: ignore
    login_manager.login_message_category = "info"
    login_manager.anonymous_user = m.AnonymousUser

    # Error handlers.
    @app.errorhandler(HTTPException)
    def handle_http_error(exc):
        return render_template("error.html", error=exc), exc.code

    return app
