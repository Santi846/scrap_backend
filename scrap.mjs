import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'assert';

export async function test() {
  let driver;

  try {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://www.selenium.dev/selenium/web/web-form.html');

    let title = await driver.getTitle();
    assert.equal("Web form", title);

    await driver.manage().setTimeouts({ implicit: 500 });

    let textBox = await driver.findElement(By.name('my-text'));
    let submitButton = await driver.findElement(By.css('button'));

    await textBox.sendKeys('Selenium', Key.RETURN);

    await driver.wait(until.elementLocated(By.id('message')), 5000);
    let message = await driver.findElement(By.id('message'));
    let value = await message.getText();
    assert.equal("Received!", value);
  } catch (e) {
    console.log(e);
  } finally {
    await driver.quit();
  }
}