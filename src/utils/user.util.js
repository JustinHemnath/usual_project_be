export function transformMessages({ messages, user }) {
  if (messages.length === 0) {
    return [];
  }

  let conversations = [];

  for (let message of messages) {
    let emailKey;
    let nameKey;

    if (message.sender === user.email) {
      emailKey = "receiver";
      nameKey = "receiver_name";
    } else {
      emailKey = "sender";
      nameKey = "sender_name";
    }
    const otherPersonEmail = message[emailKey];
    const otherPersonName = message[nameKey];

    // if no convo exists in conversations array, then add the new one
    if (conversations.length === 0) {
      conversations.push({
        otherPersonEmail,
        otherPersonName,
        messages: [message],
      });
    } else {
      const convoIndex = conversations.findIndex((convo) => convo.otherPersonEmail === otherPersonEmail);

      // if no matching convo exists in conversations array, then add the new one
      if (convoIndex === -1) {
        conversations.push({
          otherPersonEmail,
          otherPersonName,
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
    return bDate - aDate;
  });

  return conversations;
}
