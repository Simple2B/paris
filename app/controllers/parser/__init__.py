import time

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import (
    TimeoutException,
    ElementClickInterceptedException,
)
from selenium.webdriver import Chrome
import sqlalchemy as sa

from app import models as m
from app import db
from app import schema as s

from app.logger import log
from flask import current_app as app


class ParserError(Exception):
    def __init__(self, message: str):
        self.message = message


class ParserCanceled(Exception):
    def __init__(self, message: str):
        self.message = message


def raise_if_canceled():
    bot: m.Bot = db.session.scalar(sa.select(m.Bot).with_for_update())
    if bot.status == s.BotStatus.STOP:
        raise ParserCanceled("Parser was canceled")


# decorator for check if parser was canceled
def check_canceled(func):
    def wrapper(*args, **kwargs):
        raise_if_canceled()

        return func(*args, **kwargs)

    return wrapper


@check_canceled
def sign_in(browser: WebDriver, wait: WebDriverWait) -> bool:
    counter = 0

    while counter < app.config.MAX_RETRY_LOGIN_COUNT:
        browser.get(app.config.LOGIN_PAGE_LINK)

        identificator_input = wait.until(
            EC.presence_of_element_located((By.ID, "userId"))
        )
        password_input = browser.find_element(By.ID, "loginPassword")

        identificator_input.send_keys(app.config["TTP_IDENTIFICATOR"])
        password_input.send_keys(app.config["TTP_PASSWORD"])

        login_button = browser.find_element(By.ID, "log_to_b2b")
        try_click(login_button, browser)
        try:
            wait.until(EC.url_to_be(app.config.MAIN_PAGE_LINK))
        except TimeoutException:
            log(log.ERROR, "Login failed. Rerunning [%s] ...", counter + 1)
            counter += 1
            continue
        break

    if counter == app.config.MAX_RETRY_LOGIN_COUNT:
        log(log.ERROR, "Login failed")
        return False

    log(log.INFO, "Login successful")
    return True


def restart_process(browser: Chrome, wait: WebDriverWait):
    sign_in(browser, wait)
    time.sleep(1)
    click_new_choice(wait)


def button_processing(
    buttons_xpath: str,
    wait: WebDriverWait,
    browser: Chrome,
    tickets_count: int,
    date_data: str,
    floor: str,
):
    button = wait.until(EC.element_to_be_clickable((By.XPATH, buttons_xpath)))
    btn_text = browser.find_element(By.XPATH, buttons_xpath).text
    try_click(button, browser)

    log(
        log.INFO,
        "Tickets [%s] for [%s]-[%s] in %s are booked",
        tickets_count,
        btn_text,
        date_data,
        floor,
    )
    time.sleep(1)

    browser.switch_to.new_window("tab")
    sign_in(browser, wait)

    click_new_choice(wait)


def click_new_choice(wait: WebDriverWait):
    element = wait.until(EC.presence_of_element_located((By.ID, "new-choice")))
    element.click()
    time.sleep(0.5)


def prepare_tickets(browser: Chrome, wait: WebDriverWait) -> str | None:
    """Prepares tickets for booking. Returns None if tickets are not available for current month"""
    available_dates = WebDriverWait(browser, 5).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "v-calendar-day"))
    )
    if not available_dates:
        log(log.WARNING, "No available dates")
        return

    filtered_dates = [
        date_element
        for date_element in available_dates
        if "disabled" not in date_element.get_attribute("class")
    ]
    disabled_dates = [
        date_element
        for date_element in available_dates
        if "disabled" in date_element.get_attribute("class")
    ]
    if len(disabled_dates) == len(available_dates):
        log(log.WARNING, "No available dates")
        return

    elif len(filtered_dates) == 0:
        filtered_dates = [
            date_element
            for date_element in available_dates
            if "disabled" not in date_element.get_attribute("class")
        ]

    date = filtered_dates[0]
    month_text = browser.find_element(By.CLASS_NAME, "v-current-month").text
    date_data = " ".join([date.text, month_text])
    log(log.INFO, "Processing [%s] date", date_data)
    try_click(date, browser)

    return date_data


def get_tickets(tickets_count: int, browser: Chrome, wait: WebDriverWait) -> int:
    """_summary_

    Args:
        tickets_count (int): _description_
        browser (WebDriver): _description_
        wait (WebDriverWait): _description_

    Returns:
        int: _description_
    """
    while True:
        try:
            plus_button = wait.until(
                EC.presence_of_element_located(
                    (By.XPATH, '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[2]')
                )
            )
            break

        except TimeoutException:
            prepare_tickets(browser, wait)

    for counter in range(tickets_count):
        try_click(plus_button, browser)

        if browser.find_elements(
            By.XPATH, '//*[@id="te-compo-quantity"]/div/div/div[2]'
        )[0].text:
            log(log.INFO, "Only [%s] tickets are available", counter)
            minus_button = browser.find_element(
                By.XPATH, '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[1]'
            )
            try_click(minus_button, browser)

            tickets_count = counter
            break

    return tickets_count


def try_click(button: WebElement, browser: Chrome) -> None:
    try:
        button.click()
    except ElementClickInterceptedException:
        browser.execute_script("arguments[0].click();", button)


def click_continue(browser: Chrome, wait: WebDriverWait) -> None:
    button_next = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, '//*[@id="te-funnel-composition"]/div/div[4]/div/div/button')
        )
    )
    browser.execute_script('arguments[0].removeAttribute("disabled")', button_next)
    browser.execute_script("arguments[0].click();", button_next)


def crawler(browser: WebDriver, wait: WebDriverWait):
    sign_in(browser, wait)
    click_new_choice(wait)

    for _ in range(app.config.PAGES_PROCESSING):
        while True:
            date_data = prepare_tickets(browser, wait)
            if not date_data:
                next_month_button = wait.until(
                    EC.presence_of_element_located(
                        (
                            By.XPATH,
                            '//*[@id="te-compo-date"]/div/div/div/div[2]/div/div/button[2]',
                        )
                    )
                )
                next_month_button.click()
                break

            tickets_count = get_tickets(app.config.TICKETS_PER_DAY, browser, wait)
            while tickets_count > 0:
                try:
                    click_continue(browser, wait)
                    buttons_xpath = (
                        '//*[@id="te-compo-hour-first-floor-t0"]/ul/li[1]/button'
                    )
                    buttons = WebDriverWait(browser, 3).until(
                        EC.presence_of_all_elements_located(
                            (
                                By.XPATH,
                                buttons_xpath,
                            )
                        )
                    )

                    button_processing(
                        buttons_xpath,
                        wait,
                        browser,
                        tickets_count,
                        date_data,
                        "higher",
                    )
                except TimeoutException:
                    log(log.INFO, "No tickets for upper floor")
                    buttons_xpath = (
                        '//*[@id="te-compo-hour-first-floor-t1"]/ul/li[1]/button'
                    )
                    buttons = browser.find_elements(
                        By.XPATH,
                        buttons_xpath,
                    )
                    if not buttons:
                        log(
                            log.INFO,
                            "[%i] tickets are not available at all",
                            tickets_count,
                        )
                        browser.back()
                        try:
                            minus_button = WebDriverWait(
                                browser, app.config.BROWSER_TIMEOUT_SHORT
                            ).until(
                                EC.presence_of_all_elements_located(
                                    (
                                        By.XPATH,
                                        '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[1]',
                                    )
                                )
                            )
                        except TimeoutException:
                            log(log.INFO, "Page is not loaded")
                            restart_process(browser, wait)
                            break

                        log(log.INFO, "Minus button clicked")
                        try_click(minus_button[0], browser)
                        tickets_count -= 1
                        continue

                    button_processing(
                        buttons_xpath,
                        wait,
                        browser,
                        tickets_count,
                        date_data,
                        "lower",
                    )
                break
