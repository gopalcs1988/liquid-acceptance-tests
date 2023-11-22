// htmlContentReader.js

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

function readHTMLFile(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            callback(err, null);
            return;
        }
        callback(null, data);
    });
}

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

module.exports = {
    readHTMLFile,
    extractValuesFromHTML,
};
