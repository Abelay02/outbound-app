"use client"

import { useState } from "react"
import { logIntegrationInput } from "@/actions/db/integrations-actions"

export default function IntegrationsPage() {
  const [inputValue, setInputValue] = useState("")

  async function handleButtonClick() {
    // Calls the server action with the current inputValue
    await logIntegrationInput(inputValue)
    // This console.log is in the browser console
    console.log("Called logIntegrationInput with:", inputValue)
  }

  return (
    <div>
      <h1>Integrations</h1>
      <p>
        Here we handle the user’s integrations, like Smartlead or EmailBison.
      </p>

      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="rounded border px-2 py-1"
          placeholder="Type something..."
        />
        <button
          onClick={handleButtonClick}
          className="hover:bg-muted rounded border px-3 py-1"
        >
          Log Input
        </button>
      </div>
    </div>
  )
}
