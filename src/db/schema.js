import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  name: varchar({ length: 100 }),
  email: varchar({ length: 100 }).primaryKey().notNull(),
});
