import type { FizzBuzzError, PositiveInt, Result, Rule } from "@/types";
import { DEFAULT_RULES } from "@/rules";

// Validates that a number is a positive integer
const toPositiveInt = (value: number): Result<PositiveInt, FizzBuzzError> => {
  if (!Number.isInteger(value) || value <= 0) {
    return {
      ok: false,
      error: {
        type: "InvalidLimit",
        message: "Limit must be a positive integer",
        value,
      },
    };
  }

  return { ok: true, value: value as PositiveInt };
};

// Applies the given rules to a number and returns the corresponding label or the number as a string
const applyRules = (value: number, rules: readonly Rule[]): string => {
  const labels = rules
    .filter((rule) => value % rule.divisor === 0)
    .map((rule) => rule.label);

  return labels.length > 0 ? labels.join("") : value.toString();
};

// Main FizzBuzz function
// Applies the FizzBuzz logic up to the specified limit using the provided rules
// Parameters:
// - limit: The upper limit (inclusive) for the FizzBuzz sequence
// - rules: An array of Rule objects defining the divisors and their corresponding labels
// Returns:
// - A Result object containing either an array of strings representing the FizzBuzz sequence or a FizzBuzzError  
export function fizzBuzz(
  limit: number,
  rules: readonly Rule[] = DEFAULT_RULES
): Result<string[], FizzBuzzError> {
  // Validate the input limit
  const validated = toPositiveInt(limit);

  // If validation fails, return the error
  if (!validated.ok) {
    return validated;
  }

  // Generate the FizzBuzz output using the validated limit and rules
  const output = Array.from({ length: validated.value }, (_, index) =>
    applyRules(index + 1, rules)
  );

  // Return the successful result
  return { ok: true, value: output };
}
