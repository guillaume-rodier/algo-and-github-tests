import { useEffect, useRef, useState } from "react"
import { searchGithubUsers } from "@/api/github"
import type { GithubUser } from "@/types/github"
import type { RequestStatus } from "@/types/ui"

const SEARCH_DELAY_MS = 350

export function useGithubUserSearch(query: string) {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [status, setStatus] = useState<RequestStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  const requestCounter = useRef(0)
  const activeController = useRef<AbortController | null>(null)

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      activeController.current?.abort()
      setUsers([])
      setStatus("idle")
      setError(null)
      return
    }

    const timeout = window.setTimeout(() => {
      requestCounter.current += 1
      const requestId = requestCounter.current

      activeController.current?.abort()
      const controller = new AbortController()
      activeController.current = controller

      setStatus("loading")
      setError(null)

      searchGithubUsers(trimmed, controller.signal)
        .then((items) => {
          if (requestCounter.current !== requestId) {
            return
          }
          setUsers(items)
          setStatus("success")
        })
        .catch((err: unknown) => {
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
        })
    }, SEARCH_DELAY_MS)

    return () => window.clearTimeout(timeout)
  }, [query])

  return { users, status, error }
}
