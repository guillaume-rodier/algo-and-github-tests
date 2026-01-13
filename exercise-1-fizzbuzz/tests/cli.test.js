import { describe, it, expect } from "vitest"
import { spawnSync } from "node:child_process"
import path from "node:path"

describe("FizzBuzz CLI", () => {
  it("prints fizzbuzz sequence for a given number", () => {
    const cliPath = path.resolve(__dirname, "../src/cli.js")

    const result = spawnSync("node", [cliPath, "5"], {
      encoding: "utf-8"
    })

    expect(result.status).toBe(0)
    expect(result.stderr).toBe("")
    expect(result.stdout.trim()).toBe(
      ["1", "2", "Fizz", "4", "Buzz"].join("\n")
    )
  })

  it("fails with invalid argument", () => {
    const cliPath = path.resolve(__dirname, "../src/cli.js")

    const result = spawnSync("node", [cliPath, "abc"], { encoding: "utf-8" })

    expect(result.status).toBe(1)
    expect(result.stderr).toContain("Usage:")
  })
})
