const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const chromeOptions = new chrome.Options();
chromeOptions.addArguments('--ignore-certificate-errors');
chromeOptions.addArguments('--allow-insecure-localhost');

(async function automate() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(chromeOptions)
    .build();

  try {
    await driver.get('https://10.129.192.92:30492/#/login');

    const tokenRadioButton = await driver.wait(
      until.elementLocated(
        By.xpath(
          "//mat-radio-button[contains(@id, 'mat-radio-3')]//div[contains(text(), 'Token')]",
        ),
      ),
      10000,
    );
    await driver.wait(until.elementIsVisible(tokenRadioButton), 10000);
    await tokenRadioButton.click();

    const enterTokenField = await driver.wait(
      until.elementLocated(By.xpath("//input[@id='token']")),
      10000,
    );
    await driver.wait(until.elementIsVisible(enterTokenField), 10000);

    // colocar aqui como variável de ambiente
    await enterTokenField.sendKeys('');
    await enterTokenField.sendKeys(Key.RETURN);
  } catch (e) {
    console.error(`Ocorreu um erro: ${e}`);
  } finally {
    await driver.quit();
  }
})();
