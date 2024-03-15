const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;
const credentials = require('./credentials.js');

async function createTk() {
  let chromeOptions = new chrome.Options();

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

let tk_type = "Crear caso";
if (tk_type == "Crear caso") {
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
  
  let element = await driver.wait(until.elementLocated(By.xpath("//body/div[@id='root']/main[1]/main[1]/div[1]/div[1]/div[3]/div[1]/div[1]/form[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[2]/span[1]/button[1]")), 10000);
  await driver.wait(until.elementIsVisible(element), 10000);
  await element.click();

  let optionElement = await element.findElement(By.xpath('//span[contains(text(), "Requerimientos de Servicio")]'));
  await driver.wait(until.elementIsVisible(optionElement), 10000);
  await optionElement.click();

  let service = await driver.findElement(By.xpath("//input[@id='service']"));
  await service.click();
  await driver.wait(until.elementIsVisible(service), 10000);
  await service.sendKeys(' ');

  let option = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "UY - SOPORTE ON SITE CON TÉCNICOS RESIDENTES")]')), 10000);
  await driver.wait(until.elementIsVisible(option), 10000);
  await option.click();


} catch (error) {
  console.error('An error occurred:', error);
} 
// finally {
//   await driver.quit();
// }
}

}

async function updatePautas(){
  let chromeOptions = new chrome.Options();

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

let tk_type = "Actualizar pautas";
if (tk_type == "Actualizar pautas") {
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

  // Search for an element by name and click on it
  // this works //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // const searchInput = await driver.wait(until.elementLocated(By.xpath("//td[contains(text(),'POSADAS - ZA - Configuracion semanal MFA')]")), 10000);
  await driver.findElement(By.xpath("//thead/tr[1]/th[11]/span[1]/a[1]")).click();
  const searchInput = await driver.wait(until.elementLocated(By.xpath("//tr[contains(., 'Abierto') and contains(., 'POSADAS - ZA - Configuracion semanal MFA')]")), 10000);
  await driver.wait(until.elementIsVisible(searchInput), 10000);
  await searchInput.click();

  // Wait for the search results to load
  await driver.sleep(20000); // Adjust the delay as needed

  // const searchResult = await driver.findElement(By.xpath(`//span[contains(text(), '${elementName}')]`));
  // await searchResult.click();
}
catch (error) {
  console.error('An error occurred:', error);
} 
}
}

try {
  updatePautas();
} catch (error) {
  console.log(error);
}
