import { db } from "../db/db.js";
import { users } from "../db/schema.js";

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
      action: "new register",
      metaData: {
        users,
      },
    });
  } else {
  }

  res.send("Post");
}

export async function postUser(req, res) {
  await db.insert(users).values({ name: "Andrew", email: "andrew@gmail.com" });
  res.send("posted");
}
