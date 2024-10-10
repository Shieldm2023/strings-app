import { sql } from "@/scripts/dbConnection";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const json = await request.json();

  const res = await sql(
    "select id, username from users where username ilike $1",
    [json.username]
  );

  if (res.rowCount != null && res.rowCount > 0) {
    return NextResponse.json({ error: "user already exists" }, { status: 400 });
  }

  const saltRounds = 10;
  const hash = await bcrypt.hash(json.password, saltRounds);

  await sql(
    "insert into users (username, password, avatar) values($1, $2, $3)",
    [json.username, hash, faker.image.avatar()]
  );

  return NextResponse.json({ msg: "Account Created" }, { status: 201 });
}
