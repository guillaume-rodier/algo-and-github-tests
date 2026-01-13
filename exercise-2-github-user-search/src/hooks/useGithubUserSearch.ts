import { useCallback, useEffect, useRef, useState } from "react"
import { searchGithubUsers } from "@/api/github"
import type { GithubUser } from "@/types/github"
import type { RequestStatus } from "@/types/ui"

export function useGithubUserSearch(query: string) {
  const [users, setUsers] = useState<GithubUser[]>([])
  const [status, setStatus] = useState<RequestStatus>("idle")
  const [error, setError] = useState<string | null>(null)

  // Track the most recent request to ignore stale responses.
  const requestCounter = useRef(0)
  // Keep a handle to abort the in-flight request when query changes.
  const activeController = useRef<AbortController | null>(null)
  const trimmedQuery = query.trim()

  // Start a new request and cancel any previous one.
  const beginRequest = useCallback(() => {
    requestCounter.current += 1
    const requestId = requestCounter.current

    activeController.current?.abort()
    const controller = new AbortController()
    activeController.current = controller

    return { controller, requestId }
  }, [])

  // Guard against stale or aborted requests.
  const isStale = useCallback(
    (controller: AbortController, requestId: number) =>
      controller.signal.aborted || requestCounter.current !== requestId,
    []
  )

  // Apply successful results only if this request is still the latest.
  const applySuccess = useCallback((items: GithubUser[], requestId: number) => {
    if (requestCounter.current !== requestId) {
      return
    }
    setUsers(items)
    setStatus("success")
  }, [])

  // Apply error state only for the latest non-aborted request.
  const applyError = useCallback(
    (
      err: unknown,
      controller: AbortController,
      requestId: number
    ) => {
      if (isStale(controller, requestId)) {
        return
      }

      const message = err instanceof Error
        ? err.message
        : "Unable to reach Github."

      setError(message)
      setStatus("error")
    },
    [isStale]
  )

  // Effect to run on query changes.
  useEffect(() => {
    // Empty query: cancel any in-flight request and keep idle state.
    if (!trimmedQuery) {
      activeController.current?.abort()
      return
    }

    const { controller, requestId } = beginRequest()

    const runRequest = async () => {
      // Wait a tick so rapid changes can cancel before starting.
      await Promise.resolve()
      if (isStale(controller, requestId)) {
        return
      }

      setStatus("loading")
      setError(null)

      // Perform the search.
      try {
        const items = await searchGithubUsers(trimmedQuery, controller.signal)
        applySuccess(items, requestId)
      } catch (err: unknown) {
        applyError(err, controller, requestId)
      }
    }

    void runRequest()
  }, [trimmedQuery, beginRequest, isStale, applySuccess, applyError])

  return {
    users: trimmedQuery ? users : [],
    status: trimmedQuery ? status : "idle",
    error: trimmedQuery ? error : null,
  }
}
