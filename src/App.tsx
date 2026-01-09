import { Link, Outlet } from "react-router-dom"
import './App.css'

function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <Link to="/">Exercice 1</Link>
        <Link to="/GithubProfilResearch">Exercice 2</Link>
      </nav>

      <Outlet />
    </div>
  )
}

export default App
