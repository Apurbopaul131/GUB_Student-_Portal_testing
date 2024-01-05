const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

//Main function that controll the hole function
(async function example() {
    let driver;
    try {
        driver = await new Builder().forBrowser('firefox').build();
        await driver.get('https://studentportal.green.edu.bd/Account/login?ReturnUrl=%2F');
        await driver.wait(until.titleIs('Log in - GUB Student Portal'), 8000);
        await driver.findElement(By.id('Input_LoginId')).sendKeys('193002133');
        await driver.findElement(By.id('Input_Password')).sendKeys('1310367010');
        await driver.findElement(By.xpath('//*[@id="account"]/div[4]/button')).click();
        await driver.wait(until.urlIs('https://studentportal.green.edu.bd/'), 5000);
        await driver.findElement(By.xpath('/html/body/header/nav/div/div/div[2]/div/ul/li[3]/a')).click();
        await driver.wait(until.urlIs('https://studentportal.green.edu.bd/Account/Login'), 5000);
        console.log(`Logout test for ID 193002133 and password 1310367010} successfully.`);
    } catch (error) {
        console.log(`Logout test for ID 193002133 and password 1310367010.`);
        console.error('An error occurred:', error.message);
    } finally {
        driver.quit();
    }
})();