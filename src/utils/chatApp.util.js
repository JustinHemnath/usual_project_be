import { prisma } from "../db/db.js";

export async function messageListener(socket) {
  socket.on("messageListener", async (payload) => {
    // ...

    console.log({ payload });

    // await prisma.messages.create({
    //   data: {
    //     sender: payload.sender,
    //     receiver: args.receiver,
    //     sender_name: payload.sender_name,
    //     receiver_name: payload.receiver_name,
    //     message: payload.message,
    //   },
    // });
  });
}
