import { useEffect, useRef, useState } from "react"
import { searchGithubUsers } from "@/api/github"
import type { GithubUser } from "@/types/github"
import type { RequestStatus } from "@/types/ui"

export function useGithubUserSearch(query: string) {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [status, setStatus] = useState<RequestStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const requestCounter = useRef(0)
  const activeController = useRef<AbortController | null>(null)
  const trimmedQuery = query.trim()

  useEffect(() => {
    if (!trimmedQuery) {
      activeController.current?.abort()
      return
    }

    requestCounter.current += 1
    const requestId = requestCounter.current

    activeController.current?.abort()
    const controller = new AbortController()
    activeController.current = controller

    const runRequest = async () => {
      await Promise.resolve()
      if (controller.signal.aborted) {
        return
      }
      if (requestCounter.current !== requestId) {
        return
      }

      setStatus("loading")
      setError(null)

      try {
        const items = await searchGithubUsers(trimmedQuery, controller.signal)
        if (requestCounter.current !== requestId) {
          return
        }
        setUsers(items)
        setStatus("success")
      } catch (err: unknown) {
        if (controller.signal.aborted) {
          return
        }
        if (requestCounter.current !== requestId) {
          return
        }
        const message =
          err instanceof Error ? err.message : "Unable to reach Github."
        setError(message)
        setStatus("error")
      }
    }

    void runRequest()
  }, [trimmedQuery])

  return {
    users: trimmedQuery ? users : [],
    status: trimmedQuery ? status : "idle",
    error: trimmedQuery ? error : null,
  }
}
