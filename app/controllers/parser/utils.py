import datetime

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.common.exceptions import (
    TimeoutException,
)
from selenium.webdriver import Chrome

from app.logger import log
from app import schema as s
from config import config
from .web_elements import try_click, click_new_choice, wait_for_page_to_load
from .exceptions import check_canceled
from .bot_log import bot_log


CFG = config()


@check_canceled
def sign_in(browser: Chrome, wait: WebDriverWait) -> bool:
    """Logins to TTP. Returns True if login was successful, False otherwise.
        Does CFG.MAX_RETRY_LOGIN_COUNT attempts to login.

    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    attempts = 0

    while attempts < CFG.MAX_RETRY_LOGIN_COUNT:
        browser.get(CFG.LOGIN_PAGE_LINK)
        try:
            wait.until(EC.url_to_be(CFG.MAIN_PAGE_LINK))
            log(log.DEBUG, "Logged in successfully (via session)")
            break
        except TimeoutException:
            bot_log("Session login expired. Logging in again", s.BotLogLevel.WARNING)
        identify_input = wait.until(EC.presence_of_element_located((By.ID, "userId")))
        password_input = browser.find_element(By.ID, "loginPassword")

        identify_input.send_keys(CFG.TTP_IDENTIFICATOR)
        password_input.send_keys(CFG.TTP_PASSWORD)

        login_button = wait.until(EC.presence_of_element_located((By.ID, "log_to_b2b")))
        try_click(login_button, browser)
        try:
            wait.until(EC.url_to_be(CFG.MAIN_PAGE_LINK))
        except TimeoutException:
            bot_log(
                f"Login failed. Rerunning [{attempts + 1}] ...",
                s.BotLogLevel.ERROR,
            )
            attempts += 1
            continue
        break

    if attempts == CFG.MAX_RETRY_LOGIN_COUNT:
        bot_log("Login failed", s.BotLogLevel.ERROR)
        return False

    bot_log("Login successful")
    return True


@check_canceled
def restart_process(browser: Chrome, wait: WebDriverWait, month_button_clicks: int):
    """Restarts process (in same tab) in case of error.


    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
        month_button_clicks (int): number of clicks on "next month" button
    """
    log(log.DEBUG, "Logging in again")

    browser.execute_script("window.open('', '_blank')")
    browser.close()
    windows = browser.window_handles
    browser.switch_to.window(windows[0])

    browser.get(CFG.LOGIN_PAGE_LINK)
    try:
        wait.until(EC.url_to_be(CFG.MAIN_PAGE_LINK))
        bot_log("Logged in successfully (via session)")
    except TimeoutException:
        bot_log("Session login expired. Logging in again", s.BotLogLevel.WARNING)
        sign_in(browser, WebDriverWait(browser, CFG.BROWSER_TIMEOUT_LONG))
    click_new_choice(wait)

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


@check_canceled
def get_date_info(browser: Chrome, wait: WebDriverWait, day: int) -> bool:
    """Return True if date is available for booking, False otherwise.
        Clicks on date if it is available.


    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    wait_for_page_to_load(browser)
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
        bot_log(
            f"Day [{day}] is not available (due to TimeoutException)",
            s.BotLogLevel.WARNING,
        )
        return False

    if "disabled" in date.get_attribute("class"):
        log(log.DEBUG, "button class is %s", date.get_attribute("class"))
        bot_log(f"Day [{day}] is not available")
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
        bot_log("No available dates", s.BotLogLevel.WARNING)
        return None

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
        bot_log("No available dates", s.BotLogLevel.WARNING)
        return None

    elif len(filtered_dates) == 0:
        filtered_dates = [
            date_element
            for date_element in available_dates
            if "disabled" not in date_element.get_attribute("class")
        ]

    date = filtered_dates[0]
    date_data = date.text
    bot_log(f"Processing [{date_data}] date")
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
        browser (Chrome): driver instance
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
            log(log.DEBUG, "Only [%s] tickets are available", counter)
            minus_button = browser.find_element(
                By.XPATH, '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[1]'
            )
            try_click(minus_button, browser)

            tickets_count = counter
            break

    return tickets_count


def day_increment(processing_date: datetime.date) -> tuple[datetime.date, bool]:
    """Increments day in processing_date.
    Returns (datetime.date, True) if month has changed, (datetime.date, False) otherwise
    """
    current_month = processing_date.month

    processing_date += datetime.timedelta(days=1)
    if current_month != processing_date.month:
        bot_log("No available dates for current month", s.BotLogLevel.WARNING)
        return (processing_date, True)
    return (processing_date, False)
