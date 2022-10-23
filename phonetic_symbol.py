import os

import requests
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


def main():
    load_dotenv()
    API_URL = os.environ['API_URL']
    res = requests.get(API_URL)
    driver = configure_driver()
    phonetic_symbol_list = get_phonetic_symbols(driver, res.json())
    write_list_object_to("phonetic_symbols.txt", phonetic_symbol_list)


def configure_driver():
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--incognito')
    return webdriver.Chrome(ChromeDriverManager().install(), options=options)


def get_phonetic_symbols(driver, spread_sheet_row):
    url = "https://ejje.weblio.jp/"
    driver.get(url)

    wait = WebDriverWait(driver, 60)
    phonetic_symbol_list = []
    num_of_lines = len(spread_sheet_row)

    for i in range(num_of_lines):
        # 単語の検索→発音記号を取得、のループ
        search_box = wait.until(
            lambda driver: driver.find_element(By.ID, 'searchWord'))
        wait.until(EC.element_to_be_clickable((By.ID, 'searchWord')))
        if i > 0:
            search_box.clear()
        search_box.click()
        search_box.send_keys(spread_sheet_row[i]["English"])
        search_box.send_keys(Keys.RETURN)
        try:
            phonetic_symbol_list.append(wait.until(
                lambda driver: driver.find_element(By.CLASS_NAME, 'phoneticEjjeDesc').text)
            )
        except Exception:
            phonetic_symbol_list.append("-")

        print(f'progress: {i+1} / {num_of_lines} : {phonetic_symbol_list[i]}')
    return phonetic_symbol_list


def write_list_object_to(file_name, list_object):
    with open(file_name, "a") as f:
        f.write('\n'.join(list_object))


if __name__ == '__main__':
    """10/23現状489まで取得済み
    """
    main()
