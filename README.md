# Promotional Campaigns
A small command-line utility to apply certain promotional campaigns to give discounts. The system needs to be flexible regarding the promotional rules.

| Product code | Name          | Price   |
|--------------|---------------|---------|
| 001          | Curry Sauce   | 1.95 €  |
| 002          | Pizza         | 5.99 €  |
| 003          | Men’s T-Shirt | 25.00 € |
- If you spend over €30, you get 10% off your purchase.
- If you buy 2 or more pizzas, the price for each drops to €3.99.

## Test Cases
| Items in basket | Total price |
|-----------------|-------------|
| 001,002,003     | 29.65 €     |
| 002,001,002     | 9.93 €      |
| 002,001,002,003 | 31.44 €     |

## Prerequisites
```
composer
php (>=8.2)
```

## Installation and Run the script
- All the `code` required to get started
- Need write permission to following `directory`

`./var/logs`

- Install the script
```shell
$ cd /path/to/base/directory
$ composer install --no-dev
```

- Run the script and sample output

```shell
$ php index.php
€31.44
```

## Running the tests

- Follow Install instructions.
Adapt `phpunit.xml.dist` PHP Constant according to your setup environment.

```shell
$ cd /path/to/base/directory
$ composer update
$ ./vendor/bin/phpunit tests
```

Test-cases, test unit and integration tests.