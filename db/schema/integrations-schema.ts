/*
  We'll store each user’s integration: userId -> provider -> apiKey
*/

import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

export const integrationsTable = pgTable("integrations", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  provider: text("provider").notNull(), // e.g. "smartlead" or "emailbison"
  apiKey: text("api_key").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
})

export type InsertIntegration = typeof integrationsTable.$inferInsert
export type SelectIntegration = typeof integrationsTable.$inferSelect
