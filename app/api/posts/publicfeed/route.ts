import { sql } from "@/dbConnection";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page =
    (searchParams.get("page") && parseInt(searchParams.get("page")!)) || 0;
  const limit = 10;
  const offset = page * 10;

  const res = await sql(
    `select p.*, u.avatar, u.username from posts p inner join users u on p.user_id = u.id ORDER BY created_at DESC, p.id DESC
	limit $1 offset $2;`,
    [limit, offset]
  );

  console.log(res.rows);

  return NextResponse.json({ data: res.rows });
}
