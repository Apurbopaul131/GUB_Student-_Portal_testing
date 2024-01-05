const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

//Main function that controll the hole function
(async function example() {
    let driver;
    try {
        driver = await new Builder().forBrowser('firefox').build();
        // Array of ojects that contains mulple student id and password for test login panel
        const loginInfo = [
            {
                id: '193002133',
                password: '1310367010'
            },
            {
                id: '193002134',
                password: '1310'
            },
            {
                id: '193002174',
                password: 'bappyma'
            }
        ];

        for (const { id, password } of loginInfo) {
            await testLoginAndButton(driver, id, password);
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
    } finally {
        driver.quit();
    }
})();

// This function used for handle login and test the button
async function testLoginAndButton(driver, id, password) {
    const buttonInfo = [
        {
            buttonName:'Result History',
            xpath:'//*[@id="mCSB_1_container"]/li[2]/a/span',
            url:'https://studentportal.green.edu.bd/Student/StudentCourseHistory'
        },
        {
            buttonName:'Bill history',
            xpath:'//*[@id="mCSB_1_container"]/li[3]/a/span',
            url:'https://studentportal.green.edu.bd/Student/StudentBillHistory'
        },
        {
            buttonName:'Course Evaluation',
            xpath:'//*[@id="mCSB_1_container"]/li[4]/a/span',
            url:'https://studentportal.green.edu.bd/Registration/Evaluation'
        },
        {
            buttonName:'Profile',
            xpath:'//*[@id="mCSB_1_container"]/li[8]/a/span',
            url:'https://studentportal.green.edu.bd/Student/StudentProfile'
        },
        {
            buttonName:'Password Change',
            xpath:'//*[@id="mCSB_1_container"]/li[10]/a/span',
            url:'https://studentportal.green.edu.bd/Account/ChangePasswordV2'
        }
        
    ];
    try {
        await driver.get('https://studentportal.green.edu.bd/Account/login?ReturnUrl=%2F');
        await driver.wait(until.titleIs('Log in - GUB Student Portal'), 8000);
        await driver.findElement(By.id('Input_LoginId')).sendKeys(id);
        await driver.findElement(By.id('Input_Password')).sendKeys(password);
        await driver.findElement(By.xpath('//*[@id="account"]/div[4]/button')).click(); // Replace 'yourButtonId' with the actual ID of the login button

        //check the successfully login or not using url
        await driver.wait(until.urlIs('https://studentportal.green.edu.bd/'), 5000);
        console.log(`Login test for ID ${id} and password ${password} passed.`);
        //This part handle the button test
        try{
            for(const { buttonName, xpath, url } of buttonInfo){
                await driver.findElement(By.xpath(xpath)).click();
                await driver.wait(until.urlIs(url), 8000);
                console.log(`Button ${buttonName} worked successfully`);
            }
        } catch(e){
            console.log(`Error ocured:${e.message}`)
        }
    } catch (error) {
        console.log(`Login test for ID ${id} and password ${password} failed.`);
        console.error(`Error ocured:${error.message}`);
    }
}
