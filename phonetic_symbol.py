import os
from time import sleep

import requests
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
from webdriver_manager.chrome import ChromeDriverManager


def main():
    load_dotenv()
    API_URL = os.environ['API_URL']
    res = requests.get(API_URL)
    phonetic_symbol_list = get_phonetic_symbols(res.json())
    write_list_object_to("phonetic_symbols.txt", phonetic_symbol_list)


def get_phonetic_symbols(spread_sheet_row):
    options = Options()
    options.add_argument('--headless')
    options.add_argument('--incognito')
    driver = webdriver.Chrome(ChromeDriverManager().install(), options=options)
    url = "https://ejje.weblio.jp/"
    driver.get(url)

    phonetic_symbol_list = []
    num_of_lines = len(spread_sheet_row)

    for i in range(num_of_lines):
        # 単語の検索→発音記号を取得、のループ
        WebDriverWait(driver, 60).until(
            EC.element_to_be_clickable((By.ID, 'searchWord')))
        search_box = driver.find_element_by_id("searchWord")
        if i > 0:
            search_box.clear()
        search_box.click()
        search_box.send_keys(spread_sheet_row[i]["English"])
        search_box.send_keys(Keys.RETURN)
        sleep(1)
        try:
            phonetic_symbol_list.append(
                driver.find_elements_by_class_name("phoneticEjjeDesc")[0].text)
        except Exception:
            phonetic_symbol_list.append("なし")
        print(f'progress: {i+1} / {num_of_lines}')

    return phonetic_symbol_list


def write_list_object_to(file_name, list_object):
    with open(file_name, "a") as f:
        f.write('\n'.join(list_object))


if __name__ == '__main__':
    """7/2現状466まで取得済み
    """
    main()
