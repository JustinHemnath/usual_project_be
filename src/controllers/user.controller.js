import { drizzle } from "drizzle-orm/postgres-js";
// import { drizzle } from "drizzle-orm";
// import { users } from "../db/schema.js";
import * as schema from "../db/schema.js";

// const db = drizzle(process.env.DATABASE_URL);
const db = drizzle({ schema });

export async function getUsers(req, res) {
  const usersData = await db.query.users.findMany();
  console.log({ usersData });
  res.send("HELLO WORLD");
}
