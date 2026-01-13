import { render, screen, waitFor } from "@testing-library/react"
import { useGithubUserSearch } from "@/hooks/useGithubUserSearch"
import { searchGithubUsers } from "@/api/github"
import type { GithubUser } from "@/types/github"

vi.mock("@/api/github", () => ({
  searchGithubUsers: vi.fn()
}))

function HookConsumer({ query }: { query: string }) {
  const { users, status, error } = useGithubUserSearch(query)
  return (
    <div
      data-testid="hook-state"
      data-status={status}
      data-error={error ?? ""}
      data-users={users.length}
    />
  )
}

describe("useGithubUserSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("stays idle when query is empty", () => {
    render(<HookConsumer query="   " />)

    expect(searchGithubUsers).not.toHaveBeenCalled()
    expect(screen.getByTestId("hook-state")).toHaveAttribute(
      "data-status",
      "idle"
    )
  })

  it("loads users and sets success", async () => {
    const results: GithubUser[] = [
      {
        id: 1,
        login: "octo",
        avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        html_url: "https://github.com/octo"
      }
    ]
    vi.mocked(searchGithubUsers).mockResolvedValueOnce(results)

    render(<HookConsumer query="octo" />)

    await waitFor(() =>
      expect(screen.getByTestId("hook-state")).toHaveAttribute(
        "data-status",
        "success"
      )
    )

    expect(searchGithubUsers).toHaveBeenCalledWith("octo", expect.any(Object))
    expect(screen.getByTestId("hook-state")).toHaveAttribute("data-users", "1")
  })

  it("sets error when request fails", async () => {
    vi.mocked(searchGithubUsers).mockRejectedValueOnce(new Error("Boom"))

    render(<HookConsumer query="octo" />)

    await waitFor(() =>
      expect(screen.getByTestId("hook-state")).toHaveAttribute(
        "data-status",
        "error"
      )
    )

    expect(screen.getByTestId("hook-state")).toHaveAttribute(
      "data-error",
      "Boom"
    )
  })
})
