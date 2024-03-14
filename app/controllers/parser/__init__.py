from datetime import date, time, timedelta

from selenium.common.exceptions import (
    StaleElementReferenceException,
    TimeoutException,
)
from selenium.webdriver import Chrome
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

from app import schema as s
from app.logger import log
from config import config

from .bot_log import bot_log
from .exceptions import ParserCanceled, ParserError
from .utils import (
    button_processing,
    day_increment,
    get_date_info,
    get_tickets,
    restart_process,
)
from .web_elements import (
    click_continue,
    get_to_month,
    try_click,
    wait_for_page_to_load,
)

CFG = config()


def crawler(
    browser: Chrome,
    wait: WebDriverWait,
    start_date: date | None,
    end_date: date | None,
    is_booking: bool = True,
    max_tickets: int = CFG.TICKETS_PER_DAY,
    start_time: time | None = None,
):
    """Main function of crawler. Crawls through all available dates and collects info about tickets.

    Args:
        browser (Chrome): instance of driver
        wait (WebDriverWait): instance of webDriverWait
    """
    try:
        processing_date = start_date if start_date else date.today()
        end_date = (
            end_date
            if end_date
            else processing_date + timedelta(weeks=CFG.MONTHS_PAGES_PROCESSING * 4)
        )

        month_button_clicks = (
            processing_date.month
            - date.today().month
            + 12 * (processing_date.year - date.today().year)
        )

        while processing_date < end_date:
            get_to_month(browser, wait, month_button_clicks)
            while True:
                if not get_date_info(browser, wait, processing_date.day):
                    for _ in range(50):
                        browser.refresh()
                        wait_for_page_to_load(browser)
                        get_to_month(browser, wait, month_button_clicks)
                        if get_date_info(browser, wait, processing_date.day):
                            break
                    else:
                        # if date_ticket_exist(processing_date):
                        #     update_date_tickets_count(0, processing_date)
                        processing_date, new_month_flag = day_increment(processing_date)
                        if new_month_flag or processing_date >= end_date:
                            month_button_clicks = (
                                processing_date.month
                                - date.today().month
                                + 12 * (processing_date.year - date.today().year)
                            )
                            log(
                                log.INFO,
                                "Month button clicks: %i, %s",
                                month_button_clicks,
                                processing_date,
                            )
                            break
                        continue

                bot_log(f"Processing date: {processing_date}")
                tickets_count = get_tickets(
                    max_tickets,
                    browser,
                    wait,
                    processing_date.day,
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
                        try:
                            button_processing(
                                buttons_xpath,
                                wait,
                                browser,
                                tickets_count,
                                processing_date,
                                s.Floor.SECOND,
                                is_booking,
                            )
                        except StaleElementReferenceException:
                            log(log.INFO, "StaleElementReferenceException (2 floor)")
                            break
                    except StaleElementReferenceException:
                        log(log.INFO, "StaleElementReferenceException (1 floor)")
                        break
                    get_to_month(browser, wait, month_button_clicks)
                    break
                processing_date, new_month_flag = day_increment(processing_date)
                if new_month_flag or processing_date >= end_date:
                    month_button_clicks = processing_date.month - date.today().month
                    break
                continue

        bot_log("Bot process finished")

    except ParserCanceled:
        bot_log("Parser CANCELED")

    except ParserError as e:
        bot_log(f"Parser error: [{e.message}]", s.BotLogLevel.ERROR)
