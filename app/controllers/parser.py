import time

from selenium.webdriver.remote.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webelement import WebElement
from selenium.common.exceptions import TimeoutException

from app.logger import log
from flask import current_app as app

LOGIN_PAGE_LINK = "https://ticketpro.toureiffel.paris/login"
NEW_ORDERS_LINK = "https://ticketpro.toureiffel.paris/new-order"
PAGES_PROCESSING = 3
TICKETS_PER_DAY = 50


def sign_in(browser: WebDriver, wait: WebDriverWait):
    browser.get(LOGIN_PAGE_LINK)

    identificator_input = wait.until(EC.presence_of_element_located((By.ID, "userId")))
    password_input = browser.find_element(By.ID, "loginPassword")

    identificator_input.send_keys(app.config["TTP_IDENTIFICATOR"])
    password_input.send_keys(app.config["TTP_PASSWORD"])

    login_button = browser.find_element(By.ID, "log_to_b2b")
    login_button.click()
    log(log.INFO, "Login successful")


def process_tickets(browser: WebDriver, wait: WebDriverWait):
    element = wait.until(EC.presence_of_element_located((By.ID, "new-choice")))
    element.click()
    time.sleep(1)

    for _ in range(PAGES_PROCESSING):
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

            tickets_count = get_tickets(TICKETS_PER_DAY, browser, wait)
            while tickets_count > 0:
                try:
                    click_continue(browser, wait)
                    buttons_xpath = '//*[@id="te-compo-hour-first-floor-t0"]/ul/li'
                    buttons = WebDriverWait(browser, 3).until(
                        EC.presence_of_all_elements_located(
                            (
                                By.XPATH,
                                buttons_xpath,
                            )
                        )
                    )

                    button_processing(
                        buttons,
                        wait,
                        browser,
                        buttons_xpath,
                        tickets_count,
                        date_data,
                        "higher",
                    )
                except TimeoutException:
                    log(log.INFO, "No tickets for upper floor")
                    buttons_xpath = '//*[@id="te-compo-hour-first-floor-t1"]/ul/li'
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
                        minus_button = WebDriverWait(browser, 3).until(
                            EC.presence_of_all_elements_located(
                                (
                                    By.XPATH,
                                    '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[1]',
                                )
                            )
                        )
                        if minus_button:
                            log(log.INFO, "Minus button clicked")
                            minus_button[0].click()

                        tickets_count -= 1
                        continue

                    button_processing(
                        buttons,
                        wait,
                        browser,
                        buttons_xpath,
                        tickets_count,
                        date_data,
                        "lower",
                    )
                break


def button_processing(
    buttons: list[WebElement],
    wait: WebDriverWait,
    browser: WebDriver,
    buttons_xpath: str,
    tickets_count: int,
    date_data: str,
    floor: str,
):
    for index in range(len(buttons)):
        buttons_updated = wait.until(
            EC.presence_of_all_elements_located((By.XPATH, buttons_xpath))
        )
        button = buttons_updated[index]
        log(
            log.INFO,
            "Tickets [%s] for [%s]-[%s] in %s are booked",
            tickets_count,
            button.text,
            date_data,
            floor,
        )
        button.click()
        browser.switch_to.new_window("tab")
        # process new tickets
        sign_in(browser, wait)
        break

    element = wait.until(EC.presence_of_element_located((By.ID, "new-choice")))
    element.click()


def prepare_tickets(browser: WebDriver, wait: WebDriverWait) -> str | None:
    """Prepares tickets for booking. Returns None if tickets are not available for current month"""
    available_dates = WebDriverWait(browser, 5).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "v-calendar-day"))
    )
    # available_dates = browser.find_elements(By.CLASS_NAME, "v-calendar-day")
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
    date.click()
    return date_data


def get_tickets(tickets_count: int, browser: WebDriver, wait: WebDriverWait) -> int:
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
        plus_button.click()
        if browser.find_elements(
            By.XPATH, '//*[@id="te-compo-quantity"]/div/div/div[2]'
        )[0].text:
            log(log.INFO, "Only [%s] tickets are available", counter)
            minus_button = browser.find_element(
                By.XPATH, '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[1]'
            )
            minus_button.click()
            tickets_count = counter
            break

    return tickets_count


def click_continue(browser: WebDriver, wait: WebDriverWait):
    button_next = wait.until(
        EC.presence_of_element_located(
            (By.XPATH, '//*[@id="te-funnel-composition"]/div/div[4]/div/div/button')
        )
    )
    browser.execute_script('arguments[0].removeAttribute("disabled")', button_next)
    button_next.click()
