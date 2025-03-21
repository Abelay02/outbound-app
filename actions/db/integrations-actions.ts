"use server"
 import { db } from "@/db/db"
 import { integrationsTable, InsertIntegration } from "@/db/schema/integrations-schema"
 import { ActionState } from "@/types"
 import { auth } from "@clerk/nextjs/server" // so we can read userId
 import { eq } from "drizzle-orm"

 export async function createIntegrationAction(
   data: Omit<InsertIntegration, "id" | "userId"> & {
     // we'll pass provider, apiKey from client
     // but userId we read here from server session
   }
 ): Promise<ActionState<InsertIntegration>> {
   try {
     const { userId } = await auth()
     if (!userId) {
       return { isSuccess: false, message: "No user is logged in" }
     }

     const [newRow] = await db.insert(integrationsTable)
       .values({
         ...data,
         userId
       })
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

