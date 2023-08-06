from typing import Generator

from selenium import webdriver
from selenium.webdriver.remote.webdriver import WebDriver
from flask import current_app as app
from app.logger import log


def get_browser() -> Generator[WebDriver, None, None]:
    from selenium.webdriver.chrome.options import Options
    from selenium.common.exceptions import SessionNotCreatedException

    chrome_options = Options()
    try:
        browser: WebDriver = webdriver.Remote(
            app.config["SELENIUM_REMOTE_DRIVER_URL"],
            options=chrome_options,
        )
    except SessionNotCreatedException:
        log(log.ERROR, "Selenium session not created")
        return
    try:
        yield browser
    finally:
        log(log.INFO, "Processing finished")
        # browser.quit()
