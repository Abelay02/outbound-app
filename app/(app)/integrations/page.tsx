// File: app/(app)/integrations/page.tsx

"use client"

import { useState } from "react"
import { logIntegrationInput } from "@/actions/db/integrations-actions" // existing
import { createIntegrationAction } from "@/actions/db/integrations-actions"
import { auth } from "@clerk/nextjs/server" // so we can get userId
import { useRouter } from "next/navigation" // optional if you want to refresh or navigate

export default function IntegrationsPage() {
  const [inputValue, setInputValue] = useState("")

  // new fields
  const [provider, setProvider] = useState("smartlead")
  const [apiKey, setApiKey] = useState("")

  async function handleButtonClick() {
    await logIntegrationInput(inputValue)
    console.log("Called logIntegrationInput with:", inputValue)
  }

  async function handleSaveIntegration() {
    // clerk server side auth is not accessible in a client component
    // so we do an action-based approach or pass userId from server?
    // For simplicity, let's do a small trick:
    // We'll read userId in the server action itself, not here
    await createIntegrationAction({
      // We'll pass userId in the server action (which must "import { auth }" internally).
      userId: "dummy", // We'll refine this approach in the next step.
      provider,
      apiKey
    })
    // optionally do some toast or console log
    console.log("Saved an integration for provider=", provider)
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

      <div className="mt-8 rounded border p-4">
        <h2 className="mb-4 font-bold">Add Integration</h2>
        {/* Provider */}
        <div className="mb-2">
          <label className="mr-2">Provider:</label>
          <select
            value={provider}
            onChange={e => setProvider(e.target.value)}
            className="rounded border px-2 py-1"
          >
            <option value="smartlead">Smartlead</option>
            <option value="emailbison">EmailBison</option>
          </select>
        </div>
        {/* API Key */}
        <div className="mb-2">
          <label className="mr-2">API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            className="w-64 rounded border px-2 py-1"
          />
        </div>
        <button
          onClick={handleSaveIntegration}
          className="hover:bg-muted rounded border px-3 py-1"
        >
          Save Integration
        </button>
      </div>
    </div>
  )
}
