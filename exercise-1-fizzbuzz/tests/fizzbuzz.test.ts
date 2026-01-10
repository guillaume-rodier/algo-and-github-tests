import { describe, it, expect } from "vitest";
import { fizzBuzz } from "@/fizzbuzz";
import type { Rule } from "@/types";

// Test suite for the fizzBuzz function
describe("fizzBuzz", () => {
  it("returns numbers as strings when no rule matches", () => {
    const result = fizzBuzz(2);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(["1", "2"]);
    }
  });

  it("applies Fizz rule for multiples of 3", () => {
    const result = fizzBuzz(3);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual(["1", "2", "Fizz"]);
    }
  });

  it("applies Buzz rule for multiples of 5", () => {
    const result = fizzBuzz(5);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[4]).toBe("Buzz");
    }
  });

  it("applies FizzBuzz for multiples of 3 and 5", () => {
    const result = fizzBuzz(15);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[14]).toBe("FizzBuzz");
    }
  });

  it("supports custom rules", () => {
    const rules: Rule[] = [
      { divisor: 2, label: "Foo" },
      { divisor: 7, label: "Bar" },
    ];

    const result = fizzBuzz(14, rules);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value[13]).toBe("FooBar");
    }
  });

  it("returns an error for invalid input", () => {
    const resultZero = fizzBuzz(0);
    const resultNegative = fizzBuzz(-1);
    const resultFloat = fizzBuzz(1.5);

    expect(resultZero.ok).toBe(false);
    expect(resultNegative.ok).toBe(false);
    expect(resultFloat.ok).toBe(false);
  });

  it("returns an error for negative integers", () => {
    const negatives = [-1, -2, -10];

    for (const value of negatives) {
      const result = fizzBuzz(value);
      expect(result.ok).toBe(false);
    }
  });
});
