from datetime import date, time

from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import (
    ElementClickInterceptedException,
)
from selenium.webdriver import Chrome
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

from app.logger import log
from app import models as m
from app import schema as s
from app import db
from config import config
from .tickets import update_date_tickets_count, update_ticket_time
from .exceptions import check_canceled
from .bot_log import bot_log


CFG = config()


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
    # TODO: check network traffic
    ticket_date_id = update_date_tickets_count(tickets_count, processing_date)

    with db.begin() as session:
        ticket_date = session.scalar(
            m.TicketDate.select().where(m.TicketDate.id == ticket_date_id)
        )

        if not ticket_date:
            bot_log("TicketDate id error", s.BotLogLevel.ERROR)

        else:
            buttons = browser.find_elements(By.XPATH, buttons_xpath)
            for btn in buttons:
                log(
                    log.DEBUG,
                    "Tickets [%s] for [%s]-[%s] in %s are available",
                    tickets_count,
                    btn.text,
                    processing_date,
                    floor.name,
                )
                btn_time, meridiem = btn.text.split()
                hours = int(btn_time.split(":")[0]) + 12 if "PM" in meridiem else 0
                hours %= 24
                minutes = int(btn_time.split(":")[1])

                update_ticket_time(
                    ticket_date, floor, time(hours, minutes), tickets_count
                )

    browser.back()

    # browser.switch_to.new_window("tab")
    # sign_in(browser, wait)

    # click_new_choice(wait)


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
