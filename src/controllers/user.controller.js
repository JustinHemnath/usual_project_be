import { db } from "../db/db.js";
import { users, messages } from "../db/schema.js";
import { and, eq, or } from "drizzle-orm";
import fs from "node:fs";

export async function getUsers(req, res) {
  const usersData = await db.query.users.findMany();
  console.log({ usersData });
  res.send("HELLO WORLD");
}

export async function validateUser(req, res) {
  const userToValidate = req.body?.user;
  console.log({ tri: userToValidate });

  if (!userToValidate || !userToValidate?.name || !userToValidate?.email) {
    return res.status(400).send("User details not sent");
  }

  const users = await db.query.users.findMany();

  console.log({ users });

  if (users.length === 0) {
    await db.insert(users).values({ name: userToValidate.name, email: userToValidate.email });
    console.log("Inserted");

    return res.status(200).send({
      action: "registered",
      metaData: {
        users,
      },
    });
  } else {
    const isMailRegistered = users.find((user) => user.email === userToValidate.email);

    console.log({ isMailRegistered });

    if (!isMailRegistered) {
      await db.insert(users).values({ name: userToValidate.name, email: userToValidate.email });

      return res.status(200).send({
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
        .where(or(eq(messages.sender, currentUserEmail), eq(messages.receiver, currentUserEmail)));

      return res.status(200).send({
        action: "validated",
        metaData: {
          users,
          messages: allUserMessages,
        },
      });
    }
  }
}

export async function postMessages(req, res) {
  const currentUserEmail = req.body?.email;

  const allUserMessages = await db
    .select()
    .from(messages)
    .where(or(eq(messages.sender, currentUserEmail), eq(messages.receiver, currentUserEmail)));

  fs.writeFileSync("./test.json", JSON.stringify(allUserMessages));

  res.status(200).send("HELLOOOO");
}
