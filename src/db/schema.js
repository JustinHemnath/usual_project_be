const { pgTable, varchar, timestamp } = require("drizzle-orm/pg-core");
const { sql } = require("drizzle-orm");

export const users = pgTable("users", {
  name: varchar({ length: 100 }),
  email: varchar({ length: 100 }).primaryKey().notNull(),
});
