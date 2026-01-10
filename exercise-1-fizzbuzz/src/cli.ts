import { fizzBuzz } from "@/fizzbuzz";

// Get the input number from command line arguments
const nRaw = process.argv[2];
// Convert the input to a number
const n = Number(nRaw);

// Execute the FizzBuzz function
const result = fizzBuzz(n);

// Handle and display the result
if (!result.ok) {
  console.error(result.error.message);
  process.exit(1);
}

// Print each line of the FizzBuzz output
console.log(result.value.join("\n"));
