const cheerio = require('cheerio');

function extractValuesFromHTML(htmlContent) {
    const $ = cheerio.load(htmlContent);

    const allScenariosValue = $('.card.blue-box .feature-value h5').text().trim();
    const passedScenariosValue = $('.card.green-box .feature-value h5').text().trim();
    const failedScenariosValue = $('.card.red-box .feature-value h5').text().trim();

    const extractedValues = {
        allScenarios: allScenariosValue,
        passedScenarios: passedScenariosValue,
        failedScenarios: failedScenariosValue,
    };

    return extractedValues;
}

module.exports = { extractValuesFromHTML };
