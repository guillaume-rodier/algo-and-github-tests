import type { GithubSearchResponse, GithubUser } from "@/types/github"

export async function searchGithubUsers(
  query: string,
  signal: AbortSignal
): Promise<GithubUser[]> {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}`,
    {
      signal,
      headers: {
        Accept: "application/vnd.github+json"
      }
    }
  )

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining")
    if (response.status === 403 && remaining === "0") {
      throw new Error(
        "Github API rate limit reached. Please wait a bit or try again later."
      )
    }
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null
    const apiMessage =
      payload && typeof payload.message === "string"
        ? payload.message
        : "Unexpected response from Github."
    throw new Error(apiMessage)
  }

  const data = (await response.json()) as GithubSearchResponse
  return data.items
}
