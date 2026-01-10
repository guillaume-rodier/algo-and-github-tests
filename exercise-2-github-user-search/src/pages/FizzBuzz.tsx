import { useState } from "react"
import { fizzbuzz } from "@/utils/fizzbuzz"

export default function Exercice1() {
  const [limit, setLimit] = useState(20)
  const result = fizzbuzz(limit)

  return (
    <div>
      <h1>FizzBuzz</h1>

      <label>
        Limite :&nbsp;
        <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          min={1}
        />
      </label>

      <ul>
        {result}
      </ul>
    </div>
  )
}
