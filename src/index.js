const express = require("express");
const cors = require("cors");
const { drizzle } = require("drizzle-orm/postgres-js");
const postgres = require("postgres");

const usersRoute = require("./routes/user.route");

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
