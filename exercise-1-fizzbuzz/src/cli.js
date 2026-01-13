import { fizzBuzz } from "./fizzbuzz.js"

// Get the input number from command line arguments.
const nRaw = process.argv[2]
const n = Number(nRaw)

if (!Number.isInteger(n) || n <= 0) {
  console.error("Usage: npm run fizzbuzz -- <positive integer>")
  console.error("Limit must be a positive integer")
  process.exit(1)
}

const result = fizzBuzz(n)

if (!result.ok) {
  console.error(result.error.message)
  process.exit(1)
}

console.log(result.value.join("\n"))
