import { faker } from "@faker-js/faker";
import { getClient } from "../dbConnection";
import bcrypt from "bcrypt";

async function loadAdminUser(username: string, password: string) {
  console.log(`executing load admin user ${username}`);
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const client = await getClient();
  await client.connect();
  await client.query(
    "insert into public.users (username, password, is_admin, avatar) values ($1, $2, $3, $4)",
    [username, hash, true, faker.image.avatar()]
  );
  await client.end();
}

const username = process.argv[2];
const password = process.argv[3];

loadAdminUser(username, password);
