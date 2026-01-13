import { searchGithubUsers } from "@/api/github"
import type { GithubSearchResponse } from "@/types/github"

type MockResponse = {
  ok: boolean
  status: number
  headers: { get: (name: string) => string | null }
  json: () => Promise<unknown>
}

const createResponse = (overrides: Partial<MockResponse> = {}): MockResponse => ({
  ok: true,
  status: 200,
  headers: { get: () => null },
  json: async () => ({ items: [] } satisfies GithubSearchResponse),
  ...overrides
})

describe("searchGithubUsers", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns items when response is ok", async () => {
    const response = createResponse({
      json: async () =>
        ({
          items: [
            {
              id: 1,
              login: "octo",
              avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
              html_url: "https://github.com/octo"
            }
          ]
        } satisfies GithubSearchResponse)
    })
    const fetchMock = vi.fn().mockResolvedValue(response)
    globalThis.fetch = fetchMock as unknown as typeof fetch

    const items = await searchGithubUsers("octo", new AbortController().signal)

    expect(fetchMock).toHaveBeenCalled()
    expect(items).toHaveLength(1)
  })

  it("throws a rate limit error when github is throttling", async () => {
    const response = createResponse({
      ok: false,
      status: 403,
      headers: { get: () => "0" }
    })
    const fetchMock = vi.fn().mockResolvedValue(response)
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await expect(
      searchGithubUsers("octo", new AbortController().signal)
    ).rejects.toThrow("Github API rate limit reached")
  })

  it("throws api message when response is not ok", async () => {
    const response = createResponse({
      ok: false,
      status: 422,
      headers: { get: () => null },
      json: async () => ({ message: "Bad request" })
    })
    const fetchMock = vi.fn().mockResolvedValue(response)
    globalThis.fetch = fetchMock as unknown as typeof fetch

    await expect(
      searchGithubUsers("octo", new AbortController().signal)
    ).rejects.toThrow("Bad request")
  })
})
