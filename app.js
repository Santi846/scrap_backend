const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const credentials = require('./credentials.js');


try {
  (async function test() {
  

    // let chromeOptions = new chrome.Options();

    // let driver = new Builder()
    //   .forBrowser('chrome')
    //   .setChromeOptions(chromeOptions)
    //   .setChromeService(new chrome.ServiceBuilder(path).build())
    //   .build();


      let chromeOptions = new chrome.Options();
      chromeOptions.setChromeService(new chrome.ServiceBuilder(path).build());
  
      let driver = new Builder()
        .forBrowser('chrome')
        .setChromeOptions(chromeOptions)
        .build();
  
  
  await driver.get('https://itsm.sonda.com/asmsspecialist/index.html#/project=MTc=');

  // Wait for up to 10 seconds for the element to appear
  await driver.wait(until.elementLocated(By.xpath("/html//div/main/main/div/form/div[4]/button[@class='SAML_button__L+UyC']")), 10000);

  let element = await driver.findElement(By.xpath("/html//div/main/main/div/form/div[4]/button[@class='SAML_button__L+UyC']")).click();

  let user_entry = credentials.email;
  let password_entry = credentials.password;
  
  

  try {
    // Wait until the login page has loaded
    await driver.wait(until.elementLocated(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[1]/input[@id='userNameInput']")), 10000);

    // Enter user and password
    await driver.findElement(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[1]/input[@id='userNameInput']")).sendKeys(user_entry);
    await driver.findElement(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[2]/input[@id='passwordInput']")).sendKeys(password_entry);

    // Click on the login button
    await driver.findElement(By.xpath("/html//div[2]/div[2]/div[1]/div[2]/div/div/form/div[2]/div[4]/span[@id='submitButton']")).click();

    // Wait until the token is present
    await driver.wait(until.elementLocated(By.className("Header_header__-A3K5")), 50000);

    // Perform the desired actions
    await driver.findElement(By.xpath("//span[contains(text(),'Crear caso')]")).click();
    await driver.findElement(By.xpath("//body/div[@id='root']/main[1]/main[1]/div[1]/div[1]/div[3]/div[1]/div[1]/form[1]/div[2]/div[2]/button[1]")).click();

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    await driver.quit();
  }
})();
} catch (error) {
  console.log(error);
}

