from selenium import webdriver
from selenium.webdriver.remote.webdriver import WebDriver
from flask import current_app as app
from app.logger import log
from functools import lru_cache


@lru_cache
def get_browser() -> WebDriver | None:
    from selenium.webdriver.chrome.options import Options
    from selenium.common.exceptions import SessionNotCreatedException

    chrome_options = Options()
    try:
        log(log.DEBUG, "Initializing browser (before)")
        browser = webdriver.Remote(
            app.config["SELENIUM_REMOTE_DRIVER_URL"],
            options=chrome_options,
        )
        log(log.INFO, "Browser initialized")
        return browser
    except SessionNotCreatedException:
        log(log.ERROR, "Selenium session not created")
