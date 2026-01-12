import type { CardItem } from "@/types/ui"
import "./UserCard.css"

type UserCardProps = {
  item: CardItem
  isSelected: boolean
  showCheckbox: boolean
  onToggle: (id: string) => void
}

export default function UserCard({
  item,
  isSelected,
  showCheckbox,
  onToggle
}: UserCardProps) {
  return (
    <article className={`user-card${isSelected ? " is-selected" : ""}`}>
      {showCheckbox && (
        <label className="card-checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(item.localId)}
            aria-label={`Select ${item.user.login}`}
          />
        </label>
      )}
      <div className="user-card__avatar">
        <img src={item.user.avatar_url} alt={item.user.login} />
      </div>
      <div className="user-card__info">
        <p className="user-card__id">{item.user.id}</p>
        <p className="user-card__login">{item.user.login}</p>
      </div>
      <a
        className="user-card__button"
        href={item.user.html_url}
        target="_blank"
        rel="noreferrer"
      >
        View profile
      </a>
    </article>
  )
}
