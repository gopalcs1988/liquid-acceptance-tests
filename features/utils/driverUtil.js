const webdriver = require('selenium-webdriver');
let chrome = require('selenium-webdriver/chrome');
const { Capabilities, Capability } = require('selenium-webdriver/lib/capabilities');

let opts = new chrome.Options();
const capabilities = Capabilities.chrome();
capabilities.set(Capability.LOGGING_PREFS, { browser: 'ALL' });


exports.initDriver = async () => {
        opts.addArguments("--no-sandbox");
        opts.addArguments("--disable-dev-shm-usage");
        opts.addArguments("--headless");
        driver = new webdriver.Builder()
        .withCapabilities(capabilities)
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build();

        // Maximize the browser window
        driver.manage().window().maximize();

        return driver;
}
    
