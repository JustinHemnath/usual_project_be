import express from "express";
import cors from "cors";

import usersRoute from "./routes/user.route.js";

const app = express();
const port = 8000;

app.use(cors());
app.use("/users", usersRoute);

async function main() {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
