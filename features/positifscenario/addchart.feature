Feature: Continuous add-to-cart flow

  Scenario: Add single item to cart
    Then I should add item "backpack" if not added already
    Then I should take screenshot

  Scenario: Add more than one item
    Then I should add item "bike-light" if not added already
    Then I should add item "bolt-t-shirt" if not added already
    Then I should take screenshot

  Scenario: Verify already added items
    Then I should add item "backpack" if not added already
    Then I should add item "bike-light" if not added already
    Then I should take screenshot