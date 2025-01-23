export function transformMessages({ messages, user }) {
  if (messages.length === 0) {
    return [];
  }

  let conversations = [];

  for (let message of messages) {
    const key = message.sender === user.email ? "receiver" : "sender";
    const otherPersonEmail = message[key];

    // if no convo exists in conversations array, then add the new one
    if (conversations.length === 0) {
      conversations.push({
        otherPersonEmail,
        messages: [message],
      });
    } else {
      const convoIndex = conversations.findIndex((convo) => convo.otherPersonEmail === otherPersonEmail);

      // if no matching convo exists in conversations array, then add the new one
      if (convoIndex === -1) {
        conversations.push({
          otherPersonEmail,
          messages: [message],
        });
      } else {
        // if matching convo exists in conversations array, then find and push to the existing convo
        conversations[convoIndex].messages.push(message);
      }
    }
  }

  conversations = conversations.map((convo) => ({
    ...convo,
    lastMessage: convo.messages.at(-1),
  }));

  // sort
  conversations.sort((a, b) => {
    const aDate = new Date(a.lastMessage.sent_at);
    const bDate = new Date(b.lastMessage.sent_at);

    //   return aDate - bDate;
    return bDate - aDate;
  });

  return conversations;
}
