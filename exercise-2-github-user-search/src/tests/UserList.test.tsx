import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import UserList from "@/components/list/UserList"
import type { CardItem } from "@/types/ui"

const items: CardItem[] = [
  {
    localId: "local-1",
    user: {
      id: 1,
      login: "octo",
      avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
      html_url: "https://github.com/octo"
    }
  },
  {
    localId: "local-2",
    user: {
      id: 2,
      login: "cat",
      avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
      html_url: "https://github.com/cat"
    }
  }
]

describe("UserList", () => {
  it("hides selection UI when edit mode is off", () => {
    render(
      <UserList
        items={items}
        selectedIds={[]}
        selectedCount={0}
        allSelected={false}
        status="success"
        errorMessage={null}
        query="octo"
        isEditMode={false}
        onToggleEditMode={() => undefined}
        onToggleSelection={() => undefined}
        onSelectAll={() => undefined}
        onDuplicate={() => undefined}
        onDelete={() => undefined}
      />
    )

    expect(screen.getByText("Edit mode is off")).toBeInTheDocument()
    expect(screen.queryByLabelText("Select all")).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText("Duplicate selected cards")
    ).not.toBeInTheDocument()
  })

  it("invokes select all when toggled", async () => {
    const user = userEvent.setup()
    const handleSelectAll = vi.fn()

    render(
      <UserList
        items={items}
        selectedIds={[]}
        selectedCount={0}
        allSelected={false}
        status="success"
        errorMessage={null}
        query="octo"
        isEditMode={true}
        onToggleEditMode={() => undefined}
        onToggleSelection={() => undefined}
        onSelectAll={handleSelectAll}
        onDuplicate={() => undefined}
        onDelete={() => undefined}
      />
    )

    await user.click(screen.getByLabelText("Select all"))
    expect(handleSelectAll).toHaveBeenCalledWith(true)
  })
})
