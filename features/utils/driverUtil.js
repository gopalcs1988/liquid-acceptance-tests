const webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');

let opts = new chrome.Options();


exports.initDriver = async () => {
        opts.addArguments("--no-sandbox");
        opts.addArguments("--disable-dev-shm-usage");
        opts.addArguments("--headless");
        driver = new webdriver.Builder()
        .forBrowser('chrome').setChromeOptions(opts)
        .build();

        // Maximize the browser window
        driver.manage().window().maximize();

        return driver;
}
    
