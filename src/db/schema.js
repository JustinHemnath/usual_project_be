import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  name: varchar({ length: 100 }),
  email: varchar({ length: 100 }).primaryKey().notNull(),
});

export const messages = pgTable("messages", {
  sender: varchar({ length: 100 }).notNull(),
  receiver: varchar({ length: 100 }).notNull(),
  message: text().notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true, mode: "string" }).notNull(),
});
