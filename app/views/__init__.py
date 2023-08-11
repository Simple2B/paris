# flake8: noqa F401
from .auth import auth_blueprint
from .main import main_blueprint
from .user import bp as user_blueprint
from .bot import bot_blueprint
from .ticket import bp as ticket_blueprint
from .dashboard import bp as dashboard_blueprint
from .tasks import bp as tasks_blueprint
