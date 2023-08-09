import datetime

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.common.exceptions import (
    TimeoutException,
)
from selenium.webdriver import Chrome

from app.logger import log
from config import config
from .webelements import try_click, click_new_choice
from .exceptions import check_canceled


CFG = config()


@check_canceled
def sign_in(browser: WebDriver, wait: WebDriverWait) -> bool:
    """Logins to TTP. Returns True if login was successful, False otherwise.
        Does CFG.MAX_RETRY_LOGIN_COUNT attempts to login.

    Args:
        browser (WebDriver): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    attemps = 0

    while attemps < CFG.MAX_RETRY_LOGIN_COUNT:
        browser.get(CFG.LOGIN_PAGE_LINK)
        try:
            wait.until(EC.url_to_be(CFG.MAIN_PAGE_LINK))
            log(log.INFO, "Logged in successfully (via session)")
            break
        except TimeoutException:
            log(log.INFO, "Session loggin expired. Logging in again")
        identificator_input = wait.until(
            EC.presence_of_element_located((By.ID, "userId"))
        )
        password_input = browser.find_element(By.ID, "loginPassword")

        identificator_input.send_keys(CFG.TTP_IDENTIFICATOR)
        password_input.send_keys(CFG.TTP_PASSWORD)

        login_button = wait.until(EC.presence_of_element_located((By.ID, "log_to_b2b")))
        try_click(login_button, browser)
        try:
            wait.until(EC.url_to_be(CFG.MAIN_PAGE_LINK))
        except TimeoutException:
            log(log.ERROR, "Login failed. Rerunning [%s] ...", attemps + 1)
            attemps += 1
            continue
        break

    if attemps == CFG.MAX_RETRY_LOGIN_COUNT:
        log(log.ERROR, "Login failed")
        return False

    log(log.INFO, "Login successful")
    return True


@check_canceled
def restart_process(browser: Chrome, wait: WebDriverWait):
    """Restarts process (in same tab) in case of error.


    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    log(log.INFO, "Logging in again")

    browser.execute_script("window.open('', '_blank')")
    # browser.execute_script("window.close('','_parent','');")
    browser.close()
    windows = browser.window_handles
    browser.switch_to.window(windows[0])

    browser.get(CFG.LOGIN_PAGE_LINK)
    try:
        wait.until(EC.url_to_be(CFG.MAIN_PAGE_LINK))
        log(log.INFO, "Logged in successfully (via session)")
    except TimeoutException:
        log(log.INFO, "Session loggin expired. Logging in again")
        sign_in(browser, WebDriverWait(browser, CFG.BROWSER_TIMEOUT_LONG))
    click_new_choice(wait)


@check_canceled
def get_date_info(browser: Chrome, wait: WebDriverWait, day: int) -> bool:
    """Return True if date is available for booking, False otherwise.
        Clicks on date if it is available.


    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    # TODO: change f-string
    try:
        date = wait.until(
            EC.presence_of_element_located(
                (
                    By.ID,
                    f"day-{day}",
                )
            )
        )
    except TimeoutException:
        log(log.WARNING, "Day [%s] is not avaialble (due to TimeoutException)", day)
        return False

    if "disabled" in date.get_attribute("class"):
        log(log.INFO, "Day [%s] is not avaialble", day)
        return False

    try_click(date, browser)
    return True


@check_canceled
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
    date_data = date.text
    log(log.INFO, "Processing [%s] date", date_data)
    try_click(date, browser)

    return date_data


@check_canceled
def get_tickets(
    tickets_count: int, browser: Chrome, wait: WebDriverWait, day: int
) -> int:
    """Finds maximum available tickets and returns their count
        Browser url must be set to "new-order" page

    Args:
        tickets_count (int): upper bound of tickets count
        browser (WebDriver): driver instance
        wait (WebDriverWait): wait instance

    Returns:
        int: maximum available tickets count to this date
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
            get_date_info(browser, wait, day)

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


def day_increment(processing_date: datetime.date) -> (datetime.date, bool):
    """Increments day in processing_date.
    Returns (datetime.date, True) if month has changed, (datetime.date, False) otherwise
    """
    current_month = processing_date.month

    processing_date += datetime.timedelta(days=1)
    if current_month != processing_date.month:
        log(log.INFO, "No available dates for current month")
        return (processing_date, True)
    return (processing_date, False)
