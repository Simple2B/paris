import os
import tomllib
import pathlib
from functools import lru_cache
from pydantic import BaseSettings
from flask import Flask
from app.logger import log

BASE_DIR = pathlib.Path(__file__).parent.absolute()
_project_toml = tomllib.loads((BASE_DIR / "pyproject.toml").read_text())
APP_VERSION = _project_toml["tool"]["poetry"]["version"]

APP_ENV = os.environ.get("APP_ENV", "development")


class BaseConfig(BaseSettings):
    """Base configuration."""

    ENV: str = "base"
    APP_NAME: str = "Paris Ticket Pro"
    APP_VERSION: str = APP_VERSION
    LOG_LEVEL: int = log.INFO
    SECRET_KEY: str
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    WTF_CSRF_ENABLED: bool = False

    TESTING: bool = False

    # Mail config
    MAIL_SERVER: str
    MAIL_PORT: int
    MAIL_USE_TLS: bool
    MAIL_USE_SSL: bool
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_DEFAULT_SENDER: str

    # Super admin
    ADMIN_USERNAME: str
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str

    # Pagination
    DEFAULT_PAGE_SIZE: int
    PAGE_LINKS_NUMBER: int

    # TTP
    TTP_IDENTIFICATOR: str
    TTP_PASSWORD: str

    # REDIS
    REDIS_URL: str
    REDIS_LOCAL_PORT: str

    # Selenium
    SELENIUM_PORT: int = 4444
    SELENIUM_REMOTE_DRIVER_URL: str = "http://127.0.0.1:4444/wd/hub"
    SELENIUM_SESSION_FIND_TIMEOUT: int = 10
    SELENIUM_VNC_PASSWORD: str
    SELENIUM_VNC_AUTO_CONNECT: int
    SELENIUM_VNC_RESIZE: str
    BROWSER_URL: str = ""
    SELENIUM_VNC_WIDTH: str = "1024"
    SELENIUM_VNC_HEIGHT: str = "768"
    BROWSER_TIMEOUT: float = 6
    BROWSER_TIMEOUT_SHORT: float = 2
    BROWSER_TIMEOUT_LONG: float = 10
    CHROME_DOCKER_CONTAINER_NAME: str

    # Parser
    LOGIN_PAGE_LINK = "https://ticketpro.toureiffel.paris/login"
    NEW_ORDERS_LINK = "https://ticketpro.toureiffel.paris/new-order"
    MAIN_PAGE_LINK = "https://ticketpro.toureiffel.paris/"
    RECAP_LINK = "https://ticketpro.toureiffel.paris/recap"
    MONTHS_PAGES_PROCESSING = 3
    TICKETS_PER_DAY = 50
    MAX_RETRY_LOGIN_COUNT = 5
    BROWSER_RECONNECT_TIMEOUT = 10

    BOOKING_TIME_OFFSET: int = 5

    # Scheduler
    EVENING_START_HOUR: int = 18
    EVENING_START_MINUTE: int = 0
    MORNING_START_HOUR: int = 8
    MORNING_START_MINUTE: int = 0
    BOOKING_JOB_NAME: str = "booking"
    MONTHS_NEXT_SELECTOR_COUNT: int = 6
    MINUTES_BEFORE_BOOKING: int = 3

    @staticmethod
    def configure(app: Flask):
        # Implement this method to do further configuration on your app.
        log.set_level(app.config["LOG_LEVEL"])

    class Config:
        # `.env` takes priority over `project.env`
        env_file = "project.env", ".env"


class DevelopmentConfig(BaseConfig):
    """Development configuration."""

    DEBUG: bool = True
    LOG_LEVEL: int = log.DEBUG
    ALCHEMICAL_DATABASE_URL: str = "sqlite:///" + os.path.join(
        BASE_DIR, "database-dev.sqlite3"
    )

    BROWSER_URL: str = "http://browser.localhost:8080/"

    class Config:
        fields = {
            "ALCHEMICAL_DATABASE_URL": {
                "env": "DEVEL_DATABASE_URL",
            },
            "REDIS_URL": {
                "env": "DEVEL_REDIS_URL",
            },
        }
        env_file = "project.env", ".env"


class TestingConfig(BaseConfig):
    """Testing configuration."""

    TESTING: bool = True
    PRESERVE_CONTEXT_ON_EXCEPTION: bool = False
    ALCHEMICAL_DATABASE_URL: str = "sqlite:///" + os.path.join(
        BASE_DIR, "database-test.sqlite3"
    )

    class Config:
        fields = {
            "ALCHEMICAL_DATABASE_URL": {
                "env": "TEST_DATABASE_URL",
            }
        }
        env_file = "project.env", ".env"


class ProductionConfig(BaseConfig):
    """Production configuration."""

    ALCHEMICAL_DATABASE_URL: str = os.environ.get(
        "DATABASE_URL", "sqlite:///" + os.path.join(BASE_DIR, "database.sqlite3")
    )
    WTF_CSRF_ENABLED = True
    BROWSER_URL: str = "http://browser.localhost:8080/"
    SELENIUM_REMOTE_DRIVER_URL: str = "http://chrome:4444/wd/hub"

    class Config:
        fields = {
            "ALCHEMICAL_DATABASE_URL": {
                "env": "DATABASE_URL",
            }
        }
        env_file = "project.env", ".env"


@lru_cache
def config(name=APP_ENV) -> DevelopmentConfig | TestingConfig | ProductionConfig:
    CONF_MAP = dict(
        development=DevelopmentConfig,
        testing=TestingConfig,
        production=ProductionConfig,
    )
    configuration = CONF_MAP[name]()  # type: ignore
    configuration.ENV = name
    return configuration
