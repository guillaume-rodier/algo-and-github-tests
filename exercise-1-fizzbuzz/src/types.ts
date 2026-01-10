// Type definitions for FizzBuzz application
export type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };

// Branded type for positive integers
export type PositiveInt = number & { readonly __brand: "PositiveInt" };

// Definition of a FizzBuzz rule
export interface Rule {
  readonly divisor: number;
  readonly label: string;
}

// Definition of possible FizzBuzz errors
export type FizzBuzzError = {
  type: "InvalidLimit";
  message: string;
  value: number;
};
