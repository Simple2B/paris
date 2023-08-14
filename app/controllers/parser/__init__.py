from datetime import date

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver import Chrome
from selenium.common.exceptions import (
    TimeoutException,
)

from app.logger import log
from app import schema as s
from config import config
from .web_elements import (
    try_click,
    click_new_choice,
    click_continue,
    get_to_month,
)
from .utils import (
    sign_in,
    get_tickets,
    restart_process,
    get_date_info,
    day_increment,
    button_processing,
)
from .exceptions import ParserCanceled, ParserError
from .tickets import date_ticket_exist, update_date_tickets_count
from .bot_log import bot_log

CFG = config()


def crawler(
    browser: Chrome,
    wait: WebDriverWait,
    start_date: date | None,
    end_date: date | None,
    is_booking: bool = True,
):
    """Main function of crawler. Crawls through all available dates and collects info about tickets.

    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    try:
        sign_in(browser, wait)
        click_new_choice(wait)

        processing_date = start_date if start_date else date.today()

        for month_button_clicks in range(CFG.MONTHS_PAGES_PROCESSING):
            # starts from current month and goes to the unprocessed month
            get_to_month(browser, wait, month_button_clicks)
            while True:
                if not get_date_info(browser, wait, processing_date.day):
                    if date_ticket_exist(processing_date):
                        update_date_tickets_count(0, processing_date)
                    processing_date, new_month_flag = day_increment(processing_date)
                    if new_month_flag:
                        break
                    continue

                bot_log(f"Processing date: {processing_date}")
                tickets_count = get_tickets(
                    CFG.TICKETS_PER_DAY, browser, wait, processing_date.day
                )
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
                            processing_date,
                            s.Floor.FIRST,
                            is_booking,
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
                                log.DEBUG,
                                "[%i] tickets are not available at all",
                                tickets_count,
                            )
                            browser.back()
                            get_to_month(browser, wait, month_button_clicks)
                            try:
                                minus_button = wait.until(
                                    EC.presence_of_all_elements_located(
                                        (
                                            By.XPATH,
                                            '//*[@id="cat-ADULT"]/div/div[2]/div[2]/button[1]',
                                        )
                                    )
                                )
                            except TimeoutException:
                                bot_log("Page is not loaded", s.BotLogLevel.ERROR)
                                restart_process(browser, wait, month_button_clicks)
                                get_to_month(browser, wait, month_button_clicks)
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
                            processing_date,
                            s.Floor.SECOND,
                            is_booking,
                        )
                    get_to_month(browser, wait, month_button_clicks)

                    break
                processing_date, new_month_flag = day_increment(processing_date)
                if new_month_flag:
                    break
                continue

        bot_log(f"All {CFG.MONTHS_PAGES_PROCESSING} months are processed")

    except ParserCanceled:
        bot_log("Parser CANCELED")

    except ParserError as e:
        bot_log(f"Parser error: [{e.message}]", s.BotLogLevel.ERROR)
