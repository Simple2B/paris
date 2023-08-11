from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import (
    ElementClickInterceptedException,
)
from selenium.webdriver import Chrome
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from config import config
from .exceptions import check_canceled


CFG = config()


def wait_for_page_to_load(browser):
    while not browser.execute_script("return document.readyState === 'complete'"):
        continue

    return browser.execute_script("return document.readyState === 'complete'")


@check_canceled
def try_click(button: WebElement, browser: Chrome) -> None:
    try:
        button.click()
    except ElementClickInterceptedException:
        browser.execute_script("arguments[0].click();", button)


@check_canceled
def click_continue(browser: Chrome, wait: WebDriverWait) -> None:
    button_next = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, '//*[@id="te-funnel-composition"]/div/div[4]/div/div/button')
        )
    )
    browser.execute_script('arguments[0].removeAttribute("disabled")', button_next)
    browser.execute_script("arguments[0].click();", button_next)


@check_canceled
def click_new_choice(wait: WebDriverWait):
    """Clicks on 'New choice' button"""
    element = wait.until(EC.presence_of_element_located((By.ID, "new-choice")))
    try_click(element, wait._driver)
    wait.until(EC.url_to_be(CFG.NEW_ORDERS_LINK))


def get_to_month(browser: Chrome, wait: WebDriverWait, month_button_clicks: int):
    for _ in range(month_button_clicks):
        next_month_button = wait.until(
            EC.presence_of_element_located(
                (
                    By.XPATH,
                    '//*[@id="te-compo-date"]/div/div/div/div[2]/div/div/button[2]',
                )
            )
        )
        try_click(next_month_button, browser)
