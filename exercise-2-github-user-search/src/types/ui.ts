import type { GithubUser } from "./github"

export type CardItem = {
  localId: string
  user: GithubUser
}

export type RequestStatus = "idle" | "loading" | "success" | "error"
