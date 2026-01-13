export type GithubUser = {
  id: number
  login: string
  avatar_url: string
  html_url: string
}

export type GithubSearchResponse = {
  items: GithubUser[]
}
