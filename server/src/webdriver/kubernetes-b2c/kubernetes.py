from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager  
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_argument('--ignore-certificate-errors')
chrome_options.add_argument('--allow-insecure-localhost')

# # Diretório de dados do usuário genérico
# chrome_options.add_argument('--user-data-dir=~/.config/google-chrome')
# # Diretório de perfil genérico
# chrome_options.add_argument('--profile-directory=Default')

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)
driver.get('https://10.129.192.92:30492/#/login')

try:
    token_radio_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, "//mat-radio-button[contains(@id, 'mat-radio-3')]//div[contains(text(), 'Token')]"))
    )
    
    token_radio_button.click()

    enter_token_field = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.XPATH, "//input[@id='token']"))
    )
    
    enter_token_field.send_keys('')
    enter_token_field.send_keys(Keys.RETURN)

except Exception as e:
    print(f"Ocorreu um erro: {e}")
    driver.quit()

input("Pressione Enter para sair...")