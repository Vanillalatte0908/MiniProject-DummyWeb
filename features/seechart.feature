Feature: see chart

  Scenario: see Empty chart
    Then I should remove item "bike-light" if not added already
    Then I should remove item "backpack" if not added already
    Then I should remove item "bolt-t-shirt" if not added already
    Then I should click "//*[@id="shopping_cart_container"]"
    Then I should take screenshot
    Then I should click "//*[@id="continue-shopping"]"
    Then I should take screenshot

  Scenario: see chat fill
    Then I should add item "bike-light" if not added already
    Then I should add item "backpack" if not added already
    Then I should click "//*[@id="shopping_cart_container"]"
    Then I should take screenshot