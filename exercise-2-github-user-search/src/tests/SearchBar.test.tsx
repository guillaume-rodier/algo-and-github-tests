import { useState } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import SearchBar from "@/components/search/SearchBar"

function SearchBarHarness() {
  const [query, setQuery] = useState("")
  return <SearchBar query={query} onChange={setQuery} />
}

describe("SearchBar", () => {
  it("renders the input with the current query", () => {
    render(<SearchBar query="octo" onChange={() => undefined} />)

    const input = screen.getByPlaceholderText("Search input")
    expect(input).toHaveValue("octo")
    expect(input).toHaveAttribute("type", "text")
    expect(input).toHaveAttribute("autoComplete", "off")
    expect(input).toHaveAttribute("autoCorrect", "off")
  })

  it("calls onChange when typing", async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<SearchBar query="" onChange={handleChange} />)

    await user.type(screen.getByPlaceholderText("Search input"), "dev")
    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith(expect.any(String))
  })

  it("updates the input value when controlled by state", async () => {
    const user = userEvent.setup()
    render(<SearchBarHarness />)

    const input = screen.getByPlaceholderText("Search input")
    await user.type(input, "dev")
    expect(input).toHaveValue("dev")
  })
})
