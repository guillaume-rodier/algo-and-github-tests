import "./SearchBar.css"

type SearchBarProps = {
  query: string
  onChange: (value: string) => void
}

export default function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <section className="search-panel">
      <input
        id="github-search-input"
        className="search-panel__input"
        type="text"
        placeholder="Search input"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
      />
    </section>
  )
}
