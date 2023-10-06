@login
Feature: Test the login feature of the liquid application
Scenario: To access the google search page
Given Access the login page with the URL of "http://localhost:2000"
And Check that user is able to access the login page
When Enter the username as "rajagopal"
And Enter the password as "password"
And Click on the login button
Then Check that the consent page is displayed
And Click on the consent button
Then Check that agent is able to view the status as "UP" on the redirect page

