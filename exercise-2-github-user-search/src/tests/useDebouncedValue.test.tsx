import { act, render, screen } from "@testing-library/react"
import { useDebouncedValue } from "@/hooks/useDebouncedValue"

function DebounceConsumer({ value, delay }: { value: string; delay: number }) {
  const debouncedValue = useDebouncedValue(value, delay)
  return <div data-testid="debounced" data-value={debouncedValue} />
}

describe("useDebouncedValue", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it("delays updates until the timeout completes", async () => {
    const { rerender } = render(<DebounceConsumer value="a" delay={200} />)

    rerender(<DebounceConsumer value="b" delay={200} />)
    const getValue = () =>
      screen.getByTestId("debounced").getAttribute("data-value")
    expect(getValue()).toBe("a")

    act(() => {
      vi.advanceTimersByTime(200)
    })
    await act(async () => {
      await vi.runAllTimersAsync()
    })
    expect(getValue()).toBe("b")
  })
})
