import { useEffect, useRef } from "react"
import UserCard from "@/components/card/UserCard"
import duplicateIcon from "@/assets/icons/duplicate.svg"
import deleteIcon from "@/assets/icons/delete.svg"
import type { CardItem, RequestStatus } from "@/types/ui"
import "./UserList.css"

type UserListProps = {
  items: CardItem[]
  selectedIds: string[]
  selectedCount: number
  allSelected: boolean
  status: RequestStatus
  errorMessage: string | null
  query: string
  isEditMode: boolean
  onToggleEditMode: (value: boolean) => void
  onToggleSelection: (id: string) => void
  onSelectAll: (checked: boolean) => void
  onDuplicate: () => void
  onDelete: () => void
}

export default function UserList({
  items,
  selectedIds,
  selectedCount,
  allSelected,
  status,
  errorMessage,
  query,
  isEditMode,
  onToggleEditMode,
  onToggleSelection,
  onSelectAll,
  onDuplicate,
  onDelete
}: UserListProps) {
  const selectAllRef = useRef<HTMLInputElement | null>(null)
  const selectedSet = new Set(selectedIds)
  const emptyState =
    status === "success" && items.length === 0 && query.trim().length > 0

  useEffect(() => {
    if (!selectAllRef.current) {
      return
    }
    selectAllRef.current.indeterminate = selectedCount > 0 && !allSelected
  }, [selectedCount, allSelected])

  return (
    <section className="list-section">
      <div className="toolbar">
        <div className="toolbar__left">
          {isEditMode ? (
            <>
              <label className="select-all">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allSelected}
                  onChange={(event) => onSelectAll(event.target.checked)}
                  disabled={items.length === 0}
                  aria-label="Select all cards"
                />
              </label>
              <span className="selection-count">
                {selectedCount} {selectedCount === 1 ? "element" : "elements"}{" "}
                selected
              </span>
            </>
          ) : (
            <span className="selection-count selection-count--muted">
              Edit mode is off
            </span>
          )}
        </div>

        <div className="toolbar__right">
          <div className="action-buttons" aria-hidden={!isEditMode}>
            {isEditMode ? (
              <>
                <button
                  type="button"
                  className="icon-button"
                  onClick={onDuplicate}
                  disabled={selectedCount === 0}
                  aria-label="Duplicate selected cards"
                >
                  <img src={duplicateIcon} alt="" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="icon-button icon-button--danger"
                  onClick={onDelete}
                  disabled={selectedCount === 0}
                  aria-label="Delete selected cards"
                >
                  <img src={deleteIcon} alt="" aria-hidden="true" />
                </button>
              </>
            ) : (
              <span className="action-buttons__placeholder" />
            )}
          </div>
          <label className="edit-toggle">
            <input
              type="checkbox"
              checked={isEditMode}
              onChange={(event) => onToggleEditMode(event.target.checked)}
            />
            <span>Edit mode</span>
          </label>
        </div>
      </div>

      <div className="results">
        <div className="status">
          {status === "idle" && (
            <p className="status-message">
              Start typing to search Github users.
            </p>
          )}
          {status === "error" && errorMessage && (
            <p className="status-message status-message--error">
              {errorMessage}
            </p>
          )}
          {emptyState && (
            <p className="status-message">No results for this search.</p>
          )}
        </div>

        <div className="card-grid" aria-live="polite">
          {items.map((item) => (
            <UserCard
              key={item.localId}
              item={item}
              isSelected={selectedSet.has(item.localId)}
              showCheckbox={isEditMode}
              onToggle={onToggleSelection}
            />
          ))}
        </div>

        {status === "loading" && (
          <div className="results-overlay" role="status" aria-live="polite">
            <span className="spinner" aria-hidden="true" />
            <span className="visually-hidden">Fetching Github profiles...</span>
          </div>
        )}
      </div>
    </section>
  )
}
