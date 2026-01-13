import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "@/App"
import { useGithubUserSearch } from "@/hooks/useGithubUserSearch"
import type { GithubUser } from "@/types/github"

vi.mock("@/hooks/useDebouncedValue", () => ({
  useDebouncedValue: (value: string) => value
}))

vi.mock("@/hooks/useGithubUserSearch", () => ({
  useGithubUserSearch: vi.fn()
}))

const users: GithubUser[] = [
  {
    id: 1,
    login: "octo",
    avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
    html_url: "https://github.com/octo"
  },
  {
    id: 2,
    login: "cat",
    avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
    html_url: "https://github.com/cat"
  }
]

describe("App", () => {
  beforeEach(() => {
    vi.mocked(useGithubUserSearch).mockImplementation((query: string) => ({
      users: query ? users : [],
      status: query ? "success" : "idle",
      error: null
    }))
  })

  it("duplicates selected items and resets on search change", async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText("Search input"), "octo")
    await waitFor(() =>
      expect(
        screen.getAllByRole("link", { name: "View profile" })
      ).toHaveLength(2)
    )

    await user.click(screen.getByLabelText("Select octo"))
    await user.click(screen.getByLabelText("Duplicate selected cards"))
    expect(screen.getAllByRole("link", { name: "View profile" })).toHaveLength(3)

    await user.type(screen.getByPlaceholderText("Search input"), "new")
    await waitFor(() =>
      expect(
        screen.getAllByRole("link", { name: "View profile" })
      ).toHaveLength(2)
    )
  })

  it("deletes selected items", async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByPlaceholderText("Search input"), "octo")
    await waitFor(() =>
      expect(
        screen.getAllByRole("link", { name: "View profile" })
      ).toHaveLength(2)
    )

    await user.click(screen.getByLabelText("Select octo"))
    await user.click(screen.getByLabelText("Delete selected cards"))

    expect(screen.getAllByRole("link", { name: "View profile" })).toHaveLength(1)
  })
})
