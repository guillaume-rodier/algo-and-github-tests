import { createBrowserRouter } from "react-router-dom"
import App from "@/App"
import FizzBuzz from "@/pages/FizzBuzz"
import GithubProfilResearch from "@/pages/GithubProfilResearch"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <FizzBuzz /> },
      { path: "/GithubProfilResearch", element: <GithubProfilResearch /> }
    ]
  }
])
