const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function test() {
  let driver = new Builder()
    .forBrowser('chrome')
    // .setChromeOptions(new chrome.Options().headless())
    .setChromeOptions(new chrome.Options())
    .build();

  await driver.get('https://itsm.sonda.com/asmsspecialist/index.html#/project=MTc=');

  // Wait for up to 10 seconds for the element to appear
  await driver.wait(until.elementLocated(By.xpath("/html//div/main/main/div/form/div[4]/button[@class='SAML_button__L+UyC']")), 10000);

  let element = await driver.findElement(By.xpath("/html//div/main/main/div/form/div[4]/button[@class='SAML_button__L+UyC']")).click();

  let user_entry = 'santiago.arocha@sonda.com';
  let password_entry = 'Viernes.2601';

  try {
    // Wait until the login page has loaded
    await driver.wait(until.elementLocated(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[1]/input[@id='userNameInput']")), 10000);

    // Enter user and password
    await driver.findElement(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[1]/input[@id='userNameInput']")).sendKeys(user_entry);
    await driver.findElement(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[2]/input[@id='passwordInput']")).sendKeys(password_entry);

    // Click on the login button
    await driver.findElement(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[4]/span[@id='submitButton']")).click();

    // Wait until the token is present
    await driver.wait(until.elementLocated(By.className("Header_header__-A3K5")), 10000);

    // Perform the desired actions
    await driver.findElement(By.xpath("//span[contains(text(),'Crear caso')]")).click();
    await driver.findElement(By.xpath("//body/div[@id='root']/main[1]/main[1]/div[1]/div[1]/div[3]/div[1]/div[1]/form[1]/div[2]/div[2]/button[1]")).click();

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await driver.quit();
  }
})();