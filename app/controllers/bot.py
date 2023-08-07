from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.remote.webdriver import WebDriver
from selenium.common.exceptions import TimeoutException

from app.logger import log
from flask import current_app as app
from .parser import (
    sign_in,
    click_continue,
    click_new_choice,
    prepare_tickets,
    get_tickets,
    button_processing,
    try_click,
    restart_process,
)


def bot_crawler(browser: WebDriver, wait: WebDriverWait):
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
