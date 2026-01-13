import { DEFAULT_RULES } from "./rules.js"

// Validates that a number is a positive integer.
const toPositiveInt = (value) => {
  if (!Number.isInteger(value) || value <= 0) {
    return {
      ok: false,
      error: {
        type: "InvalidLimit",
        message: "Limit must be a positive integer",
        value
      }
    }
  }

  return { ok: true, value }
}

// Applies the given rules to a number and returns the corresponding label or the number as a string.
const applyRules = (value, rules) => {
  const labels = rules
    .filter((rule) => value % rule.divisor === 0)
    .map((rule) => rule.label)

  return labels.length > 0 ? labels.join("") : value.toString()
}

// Main FizzBuzz function.
export function fizzBuzz(limit, rules = DEFAULT_RULES) {
  const validated = toPositiveInt(limit)

  if (!validated.ok) {
    return validated
  }

  const output = Array.from({ length: validated.value }, (_, index) =>
    applyRules(index + 1, rules)
  )

  return { ok: true, value: output }
}
