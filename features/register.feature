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

    Examples:
        | Username | FirstName | LastName | Email | Password |
        | rajagopal  | raja  | gopal | rajagopal1988@gmail.com | password |

Scenario: Check the login workflow
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When Enter the username as "rajagopal"
    And Enter the password as "password"
    And Click on the login button
    #Then Check that the consent page is displayed
    #And Click on the consent button
    Then Check that agent is able to view the status as "UP" on the redirect page
