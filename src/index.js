import express from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import usersRoute from "./routes/user.route.js";

const app = express();
const port = 8000;

app.use(cors());
app.use("/users", usersRoute);

console.log({ pro: process.env.DATABASE_URL });

async function main() {
  const client = postgres(process.env.DATABASE_URL, { prepare: false });
  const db = drizzle({ client });

  // DATABASE_URL
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
