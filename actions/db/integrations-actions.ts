"use server"

import { db } from "@/db/db"
import { integrationsTable, InsertIntegration } from "@/db/schema/integrations-schema"
import { ActionState } from "@/types"
import { eq } from "drizzle-orm"

// This will create a new integration row for the user
export async function createIntegrationAction(data: Omit<InsertIntegration, "id">)
  : Promise<ActionState<InsertIntegration>>
{
  try {
    const [newRow] = await db.insert(integrationsTable)
      .values(data)
      .returning()
    return {
      isSuccess: true,
      message: "Integration created successfully",
      data: newRow
    }
  } catch (error) {
    console.error("Error creating integration:", error)
    return { isSuccess: false, message: "Failed to create integration" }
  }
}

export async function logIntegrationInput(input: string) {
  console.log("User typed in the integrations page:", input)
}
