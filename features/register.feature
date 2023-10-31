@registration
Feature: Check the user registration flow

Scenario Outline: User registartion
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When User clicks on create account link
    And Checks that user is landed on the "Sign up" page
    Then Enters the "<Username>" in username field on the registartion page
    And Enters the "<FirstName>" in firstname field on the registartion page
    And Enters the "<LastName>" in lastname field on the registartion page
    And Enters the "<Email>" in email field on the registartion page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to login page

    Examples:
        | Username | FirstName | LastName | Email | Password |
        | rajagopal  | raja  | gopal | rajagopal1988@gmail.com | password |

Scenario: Check that user is able to login with the above created user account
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When Enter the username as "rajagopal"
    And Enter the password as "password"
    And Click on the login button
    #Then Check that the consent page is displayed
    #And Click on the consent button
    Then Check that agent is able to view the status as "UP" on the redirect page

Scenario: Check that user is unable to create an account which doesn't present under email domains
    Given Stop all the running docker containers
    Then Update the environment variable "USER_ACCOUNT_CREATION_ALLOW_ONLY_WHITELISTED_EMAIL_DOMAINS" with value "true"
    Then Update the environment variable "USER_ACCOUNT_CREATION_WHITELITED_EMAIL_DOMAINS" with value "gmail.com,outlook"
    Then Start all the docker containers
    Then User wait for 10 seconds
    Then Update the redirectURI value on DB
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When User clicks on create account link
    And Checks that user is landed on the "Sign up" page
    Then Enters the "<Username>" in username field on the registartion page
    And Enters the "<FirstName>" in firstname field on the registartion page
    And Enters the "<LastName>" in lastname field on the registartion page
    And Enters the "<Email>" in email field on the registartion page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    Then Checks that "Bad email domain" error message is displayed

    Examples:
        | Username | FirstName | LastName | Email | Password |
        | rajagopal1988  | test  | account | rajagopal@hotmail.com | password |
