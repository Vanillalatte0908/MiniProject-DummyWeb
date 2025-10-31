Feature: openweb
  Scenario: Open https://www.saucedemo.com/v2/
    Given I open the website "https://www.saucedemo.com/v1/"
    Then I should see "Swag Labs" in the title
