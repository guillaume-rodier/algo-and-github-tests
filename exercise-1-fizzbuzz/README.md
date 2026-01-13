# Exercise 1 - FizzBuzz

## Description
FizzBuzz implementation in JavaScript, with configurable rules and unit tests.

## Rules
- multiple of 3: Fizz
- multiple of 5: Buzz
- multiple of 3 and 5: FizzBuzz
- otherwise: display the number

## Installation
```bash
npm install
```

## Usage
```bash
npm run fizzbuzz -- <number>
```

Example with the number 15
```bash
npm run fizzbuzz -- 15
```

## Custom rules
You can provide your own rules via the second argument.

Example object:
```js
const rules = [
  { divisor: 2, label: "Foo" },
  { divisor: 7, label: "Bar" },
];

const result = fizzBuzz(14, rules);
```

## Tests
```bash
npm test
```

```bash
npm run test:run
```

## Structure
- src/fizzbuzz.js: FizzBuzz logic
- src/rules.js: default rules
- src/cli.js: command-line execution
- tests/fizzbuzz.test.js: unit tests
