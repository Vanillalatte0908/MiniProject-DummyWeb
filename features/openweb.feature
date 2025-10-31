Feature: openweb
  Scenario: Open https://www.saucedemo.com/v2/
    Given I open the website "https://www.saucedemo.com/v1/"
    Then I should see "Swag Labs" in the title
    Then I should take screenshot
    Then I should click "//*[@id="user-name"]" 
    Then I should sendtext "standard_user"
    Then I should take screenshot
    Then I should click "//*[@id="password"]"
    Then I should sendtext "secret_sauce"
    Then I should take screenshot
    Then I should click "//*[@id="login-button"]"
    Then I should take screenshot