from datetime import date

from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import (
    ElementClickInterceptedException,
)
from selenium.webdriver import Chrome
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from app.logger import log
from config import config
from .tickets import update_date_tickets_count
from .exceptions import check_canceled


CFG = config()


# TODO: check this function
def wait_for_page_to_load(driver):
    return driver.execute_script("return document.readyState === 'complete'")


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


@check_canceled
def button_processing(
    buttons_xpath: str,
    wait: WebDriverWait,
    browser: Chrome,
    tickets_count: int,
    processing_date: date,
    floor: str,
):
    # button = wait.until(EC.element_to_be_clickable((By.XPATH, buttons_xpath)))
    btn_text = browser.find_element(By.XPATH, buttons_xpath).text

    # try_click(button, browser)

    log(
        log.DEBUG,
        "Tickets [%s] for [%s]-[%s] in %s are available",
        tickets_count,
        btn_text,
        processing_date,
        floor,
    )

    update_date_tickets_count(tickets_count, processing_date)
    browser.back()

    # browser.switch_to.new_window("tab")
    # sign_in(browser, wait)

    # click_new_choice(wait)
