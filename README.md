# Sales Promotion
A small command-line utility for applying promotional campaigns to offer discounts. The system needs to be flexible with regard to the promotional rules.

| Id | Name       | Price |
|----|------------|-------|
| 1  | Headphones | €50   |
| 2  | Shirt      | €30   |
| 3  | Sweater    | €22   |
- If you spend over €50, you get €5 off your purchase.
- If you buy a sweater, you get one sweater free.
- If you buy 2 or more shirts, the price for each drops to €25.

| Items in basket | Total | Final |
|-----------------|-------|-------|
| 1, 2, 2, 3, 3   | €154  | €117  |

| How it works?  |       |
|----------------|-------|
| 50+30+30+22+22 | = 154 |
| -22            | = -22 |
| -(5+5)         | = -32 |
| -5             | = -37 |
| 154-37         | = 117 |

## Prerequisites
```
Node.js
npm
TypeScript
InversifyJS
Jest
```

## Installation and Run the script
- All the `code` required to get started

- Install the script
```shell
$ git clone https://github.com/tarique-iqbal/sales-promotion.git
$ cd /path/to/project/directory
$ npm install
```

- Compile and run the script
```shell
$ npm run build
```

- Run the script and sample output

```shell
$ npm run start
Original amount: €154
Applied discounts:
  Promotion 1: -€22
  Promotion 2: -€10
  Promotion 3: -€5
Final amount: €117
```
- OR (if using `ts-node` for development)

```shell
$ npm run dev
Original amount: €154
Applied discounts:
  Promotion 1: -€22
  Promotion 2: -€10
  Promotion 3: -€5
Final amount: €117
```

## Running the tests

```shell
$ cd /path/to/project/directory
$ npm test
```

- Run tests in watch mode

```shell
$ cd /path/to/project/directory
$ npm run test:watch
```

- Run tests with coverage

```shell
$ cd /path/to/project/directory
$ npm run test:coverage
```

Test-cases, test unit and integration tests.
