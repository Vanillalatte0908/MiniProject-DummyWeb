Feature: add chart

  Scenario: add chart 1
    Then I should click "//*[@id='add-to-cart-sauce-labs-backpack']"
    Then I should take screenshot

  Scenario: add chart more than 1
    Then I should click "//*[@id='add-to-cart-sauce-labs-backpack']"
    Then I should take screenshot
    Then I should click "//*[@id='add-to-cart-sauce-labs-bike-light']"
    Then I should take screenshot

  Scenario: see Empty chart
    Then I should click "//*[@id="shopping_cart_container"]/a"
    Then I should take screenshot

  Scenario: see chat fill
    Then I should click "//*[@id='add-to-cart-sauce-labs-backpack']"
    Then I should take screenshot
    Then I should click "//*[@id='add-to-cart-sauce-labs-bike-light']"
    Then I should take screenshot
    Then I should click "//*[@id="shopping_cart_container"]/a"
    Then I should takescreenshot