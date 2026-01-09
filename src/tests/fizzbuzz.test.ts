import { describe, it, expect } from "vitest"
import { fizzbuzz } from "@/utils/fizzbuzz"

describe("fizzbuzz", () => {
  it("First test", () => {
    expect(fizzbuzz(3)).toBe("Fizz")
  })
})
