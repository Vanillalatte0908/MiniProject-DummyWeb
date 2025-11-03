Feature: see chart

  Scenario: see Empty chart
    Then I should click "//*[@id="shopping_cart_container"]"
    Then I should take screenshot

  Scenario: see chat fill
    Then I should click "//*[@id='add-to-cart-sauce-labs-backpack']"
    Then I should take screenshot
    Then I should click "//*[@id='add-to-cart-sauce-labs-bike-light']"
    Then I should take screenshot
    Then I should click "//*[@id="shopping_cart_container"]"
    Then I should takescreenshot