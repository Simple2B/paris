from typing import Generator

from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.remote.webdriver import WebDriver
from flask import current_app as app
from app.logger import log


def get_browser() -> Generator[WebDriver, None, None]:
    from selenium.webdriver.chrome.options import Options

    chrome_options = Options()
    capabilities = DesiredCapabilities.CHROME.copy()

    browser: WebDriver = webdriver.Remote(
        app.config["SELENIUM_REMOTE_DRIVER_URL"],
        capabilities,  # type: ignore
        options=chrome_options,
    )
    try:
        yield browser
    finally:
        log(log.INFO, "Processing finished")
        # browser.quit()
