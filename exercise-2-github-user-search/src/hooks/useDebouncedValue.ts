import { useEffect, useState } from "react"

export function useDebouncedValue<T>(value: T, delayMs: number) {
  // Hold the debounced version of the input value.
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Schedule an update after the delay; reset if value changes.
    const timeout = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delayMs)

    // Clean up pending timeout on re-run or unmount.
    return () => window.clearTimeout(timeout)
  }, [value, delayMs])

  return debouncedValue
}
