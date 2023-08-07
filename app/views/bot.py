from flask import (
    Blueprint,
    render_template,
    redirect,
    url_for,
)
import sqlalchemy as sa

from flask_login import login_required
from app.logger import log
from app import models as m
from app import db


bot_blueprint = Blueprint("bot", __name__, url_prefix="/bot")


@bot_blueprint.route("/", methods=["GET"])
@login_required
def index():
    log(log.INFO, "bot.index")
    bot: m.Bot = db.session.scalar(sa.select(m.Bot))
    return render_template("bot/index.html", bot=bot)


@bot_blueprint.route("/refresh", methods=["GET"])
@login_required
def refresh():
    log(log.INFO, "bot.refresh")
    return redirect(url_for("bot.index"))


@bot_blueprint.route("/start", methods=["GET"])
@login_required
def start():
    log(log.INFO, "bot.start")
    # TODO: start bot
    return redirect(url_for("bot.index"))


@bot_blueprint.route("/stop", methods=["GET"])
@login_required
def stop():
    log(log.INFO, "bot.stop")
    # TODO: stop bot
    return redirect(url_for("bot.index"))
