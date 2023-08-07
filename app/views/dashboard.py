from flask import (
    Blueprint,
    render_template,
    current_app as app,
    redirect,
    url_for,
    request,
    jsonify,
)
from celery.result import AsyncResult

from flask_login import login_required
from app.logger import log
from app import controllers as c

bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")


@bp.route("/", methods=["GET"])
@login_required
def index():
    log(log.INFO, "dashboard.index")
    width = request.args.get("width", app.config["SELENIUM_VNC_WIDTH"])
    height = request.args.get("height", app.config["SELENIUM_VNC_HEIGHT"])
    browser_url = (
        app.config["BROWSER_URL"]
        + f'?autoconnect={app.config["SELENIUM_VNC_AUTO_CONNECT"]}'
        + f'&resize={app.config["SELENIUM_VNC_RESIZE"]}'
        + f'&password={app.config["SELENIUM_VNC_PASSWORD"]}'
    )
    return render_template(
        "dashboard/index.html",
        browser_url=browser_url,
        browser_width=width,
        browser_height=height,
    )


@bp.route("/size", methods=["POST"])
@login_required
def size():
    log(log.INFO, "dashboard.size")
    if "ratio" in request.form and "x" in request.form["ratio"]:
        ratio = request.form["ratio"]
        height, width = ratio.split("x")
        return redirect(url_for("dashboard.index", width=width, height=height))
    else:
        log(log.WARNING, "dashboard.size: ratio not found")
    return redirect(url_for("dashboard.index"))


@bp.route("/go", methods=["POST"])
@login_required
def go():
    log(log.INFO, "dashboard.go")
    url = request.form.get("url", type=str, default="")
    if not url:
        url = "https://google.com"
    c.go(url)
    # TODO: onclick (fetch)
    return redirect(url_for("dashboard.index"))


@bp.route("/processing", methods=["POST"])
@login_required
def processing() -> dict[str, object]:
    task = c.processing_task.delay()
    log(log.INFO, "Bot initialization task created with id [%s]", task.id)
    return {"task_id": task.id}


@bp.route("/result/<id>", methods=["GET"])
@login_required
def task_result(id: str) -> dict[str, object]:
    result = AsyncResult(id)
    return jsonify(
        {
            "ready": result.ready(),
            "successful": result.successful(),
            "value": result.result if result.ready() else None,
        }
    )
