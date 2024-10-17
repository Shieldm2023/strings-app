import { authorizeAdmin } from "@/app/util/auth";
import { sql } from "@/dbConnection";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { id: number } }
) {
  return authorizeAdmin(async () => {
    const { id } = params;
    console.log(`flagging ${id} as misinformation`);
    await sql(
      "update posts set is_misinformation = true, is_misinformation_flagged_at = now() where id = $1",
      [id]
    );
    /*await sql("delete from posts where is_misinformation = true");*/
    return NextResponse.json({
      msg: `misinformation post flagged`,
    });
  });
}
