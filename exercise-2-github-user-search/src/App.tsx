import { useMemo, useRef, useState } from "react"
import Header from "@/components/header/Header"
import SearchBar from "@/components/search/SearchBar"
import UserList from "@/components/list/UserList"
import { useGithubUserSearch } from "@/hooks/useGithubUserSearch"
import type { CardItem } from "@/types/ui"
import "./App.css"

const createLocalId = (() => {
  let counter = 0
  return () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID()
    }
    counter += 1
    return `local-${Date.now()}-${counter}`
  }
})()

function App() {
  const [query, setQuery] = useState("")
  const [duplicates, setDuplicates] = useState<CardItem[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [editMode, setEditMode] = useState(true)
  const duplicateCounter = useRef(0)

  const { users, status, error } = useGithubUserSearch(query)

  const baseItems = useMemo(
    () =>
      users.map((user) => ({
        localId: `${query}-${user.id}`,
        user
      })),
    [users, query]
  )

  const items = useMemo(() => {
    const deletedSet = new Set(deletedIds)
    const filteredBase = baseItems.filter(
      (item) => !deletedSet.has(item.localId)
    )
    const filteredDuplicates = duplicates.filter(
      (item) => !deletedSet.has(item.localId)
    )
    return [...filteredBase, ...filteredDuplicates]
  }, [baseItems, deletedIds, duplicates])

  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const selectedCount = selectedIds.length
  const allSelected = items.length > 0 && selectedCount === items.length

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
    )
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? items.map((item) => item.localId) : [])
  }

  const handleDuplicate = () => {
    if (selectedCount === 0) {
      return
    }
    setDuplicates((prev) => {
      const additions = items
        .filter((item) => selectedSet.has(item.localId))
        .map((item) => {
          duplicateCounter.current += 1
          return {
            localId: `${createLocalId()}-${duplicateCounter.current}`,
            user: item.user
          }
        })
      return additions.length > 0 ? [...prev, ...additions] : prev
    })
  }

  const handleDelete = () => {
    if (selectedCount === 0) {
      return
    }
    setDeletedIds((prev) => {
      const next = new Set(prev)
      selectedIds.forEach((id) => next.add(id))
      return Array.from(next)
    })
    setSelectedIds([])
  }

  const handleSearchChange = (value: string) => {
    setQuery(value)
    setSelectedIds([])
    setDuplicates([])
    setDeletedIds([])
    duplicateCounter.current = 0
  }

  return (
    <div className="app-shell">
      <Header title="Github Search" />
      <main className="app-content">
        <SearchBar query={query} onChange={handleSearchChange} />
        <UserList
          items={items}
          selectedIds={selectedIds}
          selectedCount={selectedCount}
          allSelected={allSelected}
          status={status}
          errorMessage={error}
          query={query}
          isEditMode={editMode}
          onToggleEditMode={setEditMode}
          onToggleSelection={toggleSelection}
          onSelectAll={handleSelectAll}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      </main>
    </div>
  )
}

export default App
