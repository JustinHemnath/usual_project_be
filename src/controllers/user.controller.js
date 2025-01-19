const { drizzle } = require("drizzle-orm");
const { users } = require("../db/schema");
// import * as schema from './schema';

// const db = drizzle(process.env.DATABASE_URL);
const db = drizzle({ schema });

export async function getUsers(req, res) {
  const usersData = await db.query.users.findMany();
  console.log({ usersData });
  res.send("HELLO WORLD");
}
