import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import UserCard from "@/components/card/UserCard"
import type { CardItem } from "@/types/ui"

const item: CardItem = {
  localId: "local-1",
  user: {
    id: 42,
    login: "octo",
    avatar_url: "https://avatars.githubusercontent.com/u/42?v=4",
    html_url: "https://github.com/octo"
  }
}

describe("UserCard", () => {
  it("renders user data and profile link", () => {
    render(
      <UserCard
        item={item}
        isSelected={false}
        showCheckbox={false}
        onToggle={() => undefined}
      />
    )

    expect(screen.getByText("octo")).toBeInTheDocument()
    expect(screen.getByText("42")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "View profile" })).toHaveAttribute(
      "href",
      "https://github.com/octo"
    )
    expect(screen.queryByLabelText("Select octo")).not.toBeInTheDocument()
  })

  it("toggles selection when checkbox is clicked", async () => {
    const user = userEvent.setup()
    const handleToggle = vi.fn()

    render(
      <UserCard
        item={item}
        isSelected={false}
        showCheckbox={true}
        onToggle={handleToggle}
      />
    )

    await user.click(screen.getByLabelText("Select octo"))
    expect(handleToggle).toHaveBeenCalledWith("local-1")
  })
})
