const webdriver = require('selenium-webdriver');


exports.initDriver = async () => {
        driver = new webdriver.Builder()
        .forBrowser('chrome')
        .build();

        // Maximize the browser window
        driver.manage().window().maximize();

        return driver;
}
    
