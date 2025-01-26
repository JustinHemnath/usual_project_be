import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

import usersRoute from "./routes/user.route.js";
import { messageListener } from "./utils/chatApp.util.js";

const app = express();
const port = 8000;
const server = createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());
app.use("/users", usersRoute);

io.on("connection", (socket) => {
  console.log("a user connected");
  messageListener(socket, io);
});

async function main() {
  server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
