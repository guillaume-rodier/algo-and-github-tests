import type { Rule } from "@/types";

// Default FizzBuzz rules
export const DEFAULT_RULES: readonly Rule[] = [
  { divisor: 3, label: "Fizz" },
  { divisor: 5, label: "Buzz" },
];
