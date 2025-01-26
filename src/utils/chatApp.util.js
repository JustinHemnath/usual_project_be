import { prisma } from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { CHAT_APP_EVENTS } from "../constants/chatApp.constant.js";

export async function messageListener(socket, io) {
  socket.on(CHAT_APP_EVENTS.TO_SERVER, async (payload) => {
    const receivedMessage = {
      sender: payload.sender,
      receiver: payload.receiver,
      sender_name: payload.sender_name,
      receiver_name: payload.receiver_name,
      message: payload.message,
      id: payload.id,
      sent_at: payload.sent_at,
    };
    const insertedRecord = await prisma.messages.create({
      data: receivedMessage,
    });

    const sockets = await io.fetchSockets();
    const connectedSockets = sockets.map((x) => ({ handshake: x.handshake.query.email, id: x.id }));
    const receiverSocket = connectedSockets.find((connectedSocket) => connectedSocket.handshake === payload.receiver);

    if (receiverSocket) {
      io.to(receiverSocket.id).emit(CHAT_APP_EVENTS.TO_CLIENT, insertedRecord);
    }
  });
}
