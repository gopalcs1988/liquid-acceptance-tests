@registration
Feature: Check the user registration flow

Scenario Outline: User registartion
    Given Stop all the running docker containers
    Then Update the environment variable "SYSTEM_DEMO_MODE" with value "99999"
    Then Update the environment variable "SYSTEM_RATE_LIMIT_LIGHT_API_MAX_LIMIT" with value "99999"
    Then Update the environment variable "SYSTEM_RATE_LIMIT_MEDIUM_API_MAX_LIMIT" with value "99999"
    Then Update the environment variable "SYSTEM_RATE_LIMIT_HEAVY_API_MAX_LIMIT" with value "99999"
    Then Update the environment variable "SYSTEM_RATE_LIMIT_EXTREME_API_MAX_LIMIT" with value "99999"
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
    And Checks that user redirected to login page
    
    Examples:
        | Username | FirstName | LastName | Email | Password |
        | rajagopal_test1  | raja  | gopal | rajagopal1988@gmail.com | password |

Scenario: Check that user is able to login with the above created user account
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When Enter the username as "rajagopal_test1"
    And Enter the password as "password"
    And Click on the login button
    #Then Check that the consent page is displayed
    #And Click on the consent button
    Then Check that agent is able to view the status as "UP" on the redirect page

Scenario: Check that user is not able to create an account with the same email address
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
    Then Checks that "Account already exists" error message is displayed

    Examples:
        | Username | FirstName | LastName | Email | Password |
        | rajagopal_test2  | raja  | gopal | rajagopal.1988@gmail.com | password |

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
        | rajagopal_test3  | test  | account | rajagopal@hotmail.com | password |

Scenario: Check that user is able to view the error message as invalid phone number, when phone number field is blank
    Given Stop all the running docker containers
    Then Update the environment variable "CAN_USE_PHONE_NUMBER" with value "true"
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
    Then Checks that "Invalid PhoneCountryCode" error message is displayed

    Examples:
        | Username | FirstName | LastName | Email | Password |
        | rajagopal_test4  | test  | noPhoneNumber | rajagopal_3@gmail.com | password |

Scenario: Check that user is able to create an account with valid phone number
    Given Stop all the running docker containers
    Then Update the environment variable "CAN_USE_PHONE_NUMBER" with value "true"
    Then Update the environment variable "USER_ACCOUNT_CREATION_ENABLE_IP_BASED_THROTTLE" with value "true"
    Then Update the environment variable "USER_ACCOUNT_CREATION_IP_BASED_THROTTLE_WINDOW_SIZE" with value "60"
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
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to login page

    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password |
        | rajagopal_test5  | test  | withPhoneNumber | rajagopal_4@gmail.com | +91 | 9600338223 | password |

Scenario: Check that user is unable to create an account for 1 min
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When User clicks on create account link
    And Checks that user is landed on the "Sign up" page
    Then Enters the "<Username>" in username field on the registartion page
    And Enters the "<FirstName>" in firstname field on the registartion page
    And Enters the "<LastName>" in lastname field on the registartion page
    And Enters the "<Email>" in email field on the registartion page
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    Then Checks that "Account creation limited" error message is displayed
    Then User wait for 60 seconds
    Then Clicks the create account button
    And Checks that user redirected to login page

    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password |
        | rajagopal_test6  | test  | withPhoneNumber | rajagopal_5@gmail.com | +91 | 9600338223 | password |

Scenario: Check that able to create an account after entering the email verification code
    Given Stop all the running docker containers
    Then Update the environment variable "USER_ACCOUNT_CREATION_REQUIRE_EMAIL_VERIFICATION" with value "true"
    And Update the environment variable "USER_ACCOUNT_CREATION_ENABLE_IP_BASED_THROTTLE" with value "false"
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
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to verify account page
    Then Get "liquid" docker container logs
    Then Get the verification code from the "liquid" docker container logs and place the value on the verify account page
    And Clicks the verify account button
    And Checks that user redirected to login page

    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password | 
        | rajagopal_test7  | test  | withPhoneNumber | rajagopal_6@gmail.com | +91 | 9600338223 | Password@1 | 

Scenario: Check that able to create an account after entering the email verification code
    Given Stop all the running docker containers
    Then Update the environment variable "USER_ACCOUNT_CREATION_REQUIRE_EMAIL_VERIFICATION" with value "false"
    Then Update the environment variable "CAN_RESET_PASSWORD" with value "true"
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
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to login page
    And Clicks the forgot password link
    And Checks that user redirected to verify your identity page
    And Enters the "<Email>" email id on the forgot password page
    Then User wait for 5 seconds
    Then Get "liquid" docker container logs
    Then Get the verification code from the "liquid" docker container logs and place the value on the verify account page
    And Enters the "<Password1>" in password field on the reset password page
    And Clicks the change password button
    And Checks that user redirected to login page
    When Enter the username as "<Username>"
    And Enter the password as "<Password1>"
    And Click on the login button
    #Then Check that the consent page is displayed
    #And Click on the consent button
    Then Check that agent is able to view the status as "UP" on the redirect page

    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password | Password1 |
        | rajagopal_test8  | test  | withPhoneNumber | rajagopal_7@gmail.com | +91 | 9600338223 | Password@1 | Password@2 |

Scenario: Check that user is able to create an account with invite code
    Given Stop all the running docker containers
    Then Update the environment variable "USER_ACCOUNT_CREATION_FORCE_GENERATE_INVITE_CODES" with value "true"
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
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to login page
    Then Stop the "liquid" container
    And Update the environment variable "USER_ACCOUNT_CREATION_ENABLE_INVITE_ONLY" with value "true"
    And Start the "liquid" container
    Then User wait for 10 seconds
    Given Access the login page with the URL of "http://localhost:2000"
    And Checks that user is able to access the login page
    When Enter the username as "<Username>"
    And Enter the password as "<Password>"
    And Click on the login button
    And User wait for 3 seconds
    And Get the code value from the current URL
    Then Check that agent is able to view the status as "UP" on the redirect page
    And Access the login page with the URL of "http://localhost:2000"
    When User clicks on create account link
    And Checks that user is landed on the "Sign up" page
    Then Enters the "<Username1>" in username field on the registartion page
    And Enters the inviteCode on the registartion page
    And Enters the "<FirstName>" in firstname field on the registartion page
    And Enters the "<LastName>" in lastname field on the registartion page
    And Enters the "<Email1>" in email field on the registartion page
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to login page
    And Checks that user is able to access the login page
    When Enter the username as "<Username1>"
    And Enter the password as "<Password>"
    And Click on the login button
    Then Check that agent is able to view the status as "UP" on the redirect page

    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password | Username1 | Email1 | 
        | rajagopal_test10  | test  | withPhoneNumber | rajagopal_9@gmail.com | +91 | 9600338223 | Password@1 | rajagopal_test11 | rajagopal_10@gmail.com |

Scenario: Check that agent is able to login with two-step authentication
    Given Stop all the running docker containers
    Then Update the environment variable "USER_ACCOUNT_CREATION_FORCE_GENERATE_INVITE_CODES" with value "false"
    And Update the environment variable "USER_ACCOUNT_CREATION_ENABLE_INVITE_ONLY" with value "false"
    And Update the environment variable "2FA_EMAIL_ENABLED" with value "true"
    And Update the environment variable "2FA_EMAIL_ENFORCE" with value "true"
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
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user is able to access the login page
    When Enter the username as "rajagopal_test10"
    And Enter the password as "password"
    And Click on the login button
    And Checks that user redirected to verify account page
    Then Get "liquid" docker container logs
    Then Get the verification code from the "liquid" docker container logs and place the value on the verify account page
    And Clicks the submit account button
    Then Check that agent is able to view the status as "UP" on the redirect page


    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password | 
        | rajagopal_test10  | test  | withPhoneNumber | rajagopal_9@gmail.com | +91 | 9600338223 | password | 

Scenario: Check that error message is thrown when the password doesn't match the REGEX format
    Given Stop all the running docker containers
    Then Update the environment variable "2FA_EMAIL_ENABLED" with value "false"
    And Update the environment variable "2FA_EMAIL_ENFORCE" with value "false"
    And Update the environment variable "USER_PROFILE_PASSWORD_VALIDATION_REGEX" with value "\"^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$\""
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
    And Enters the country code "<CountryCode>" and phone number "<PhoneNumber>" in phone number field on the registration page
    And Enters the "<Password>" in password field on the registartion page
    Then Clicks the create account button
    Then Checks that "Invalid Password" error message is displayed
    Then User wait for 10 seconds  
    And Enters the "<Password1>" in password field on the registartion page
    Then Clicks the create account button
    And Checks that user redirected to login page

    Examples:
        | Username | FirstName | LastName | Email | CountryCode | PhoneNumber | Password | Password1 |
        | rajagopal_test9  | test  | withPhoneNumber | rajagopal_8@gmail.com | +91 | 9600338223 | password | Password@1 |