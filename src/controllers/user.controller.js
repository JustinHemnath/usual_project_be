import { db } from "../db/db.js";
import { users, messages } from "../db/schema.js";
import { and, eq } from "drizzle-orm";

export async function getUsers(req, res) {
  const usersData = await db.query.users.findMany();
  console.log({ usersData });
  res.send("HELLO WORLD");
}

export async function validateUser(req, res) {
  const userToValidate = req.body?.user;

  if (!userToValidate || userToValidate?.name || userToValidate?.email) {
    res.status(400).send("User details not sent");
  }

  const users = await db.query.users.findMany();
  const isMailRegistered = users.find((user) => user.email === userToValidate.email);

  if (!isMailRegistered) {
    await db.insert(users).values({ name: userToValidate.name, email: userToValidate.email });

    res.status(200).send({
      action: "registered",
      metaData: {
        users,
      },
    });
  } else {
    const currentUserEmail = userToValidate.email;
    const allUserMessages = await db
      .select()
      .from(messages)
      .where(and(eq(messages.sender, currentUserEmail), eq(messages.receiver, currentUserEmail)));

    res.status(200).send({
      action: "validated",
      metaData: {
        users,
        messages: allUserMessages,
      },
    });
  }
}

export async function postMessages(req, res) {
  const currentUserEmail = req.body?.email;

  const allUserMessages = await db
    .select()
    .from(messages)
    .where(and(eq(messages.sender, currentUserEmail), eq(messages.receiver, currentUserEmail)));

  console.log({ allUserMessages });

  res.status(200).send("HELLOOOO");
}
