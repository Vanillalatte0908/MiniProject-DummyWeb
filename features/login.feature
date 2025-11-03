Feature: login

  Scenario: User logs in successfully
    Given I open the website "https://www.saucedemo.com"
    Then I should see "Swag Labs" in the title
    Then I should take screenshot
    Then I should click "#user-name"
    Then I should sendtext "standard_user"
    Then I should click "#password"
    Then I should sendtext "secret_sauce"
    Then I should click "#login-button"
    Then I should take screenshot