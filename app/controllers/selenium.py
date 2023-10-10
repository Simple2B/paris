import time

from selenium import webdriver
from selenium.webdriver import Chrome
import docker
from flask import current_app as app

from app.logger import log
from config import config

CFG = config()

_g_browser: Chrome | None = None  # type: ignore


def get_browser(force_reconnect=False) -> Chrome | None:
    from selenium.webdriver.chrome.options import Options
    from selenium.common.exceptions import SessionNotCreatedException

    global _g_browser

    if force_reconnect:
        from docker.models.containers import Container

        _g_browser = None
        # restart container with chrome
        # TODO: try to map sock file to container
        dc = docker.DockerClient(base_url="unix://var/run/docker.sock", version="1.40")
        container: Container = dc.containers.get(CFG.CHROME_DOCKER_CONTAINER_NAME)
        log(log.WARNING, "Restarting container [%s]", CFG.CHROME_DOCKER_CONTAINER_NAME)
        container.restart()
        time.sleep(CFG.BROWSER_RECONNECT_TIMEOUT)

    if _g_browser:
        return _g_browser

    chrome_options = Options()
    try:
        log(log.DEBUG, "Initializing browser (before)")
        # get remote driver with timeout
        _g_browser = webdriver.Remote(
            app.config["SELENIUM_REMOTE_DRIVER_URL"],
            options=chrome_options,
        )  # type: ignore
        log(log.DEBUG, "Browser initialized")
        return _g_browser
    except SessionNotCreatedException:
        log(log.ERROR, "Selenium session not created")
    return None
