import { getJWTPayload } from "@/app/util/auth";
import { sql } from "@/dbConnection";
import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Get JWT payload to identify user
    const jwtPayload = await getJWTPayload();
    if (!jwtPayload) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract filename from request URL
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get("filename");
    if (!filename) {
      return NextResponse.json(
        { error: "Filename is required" },
        { status: 400 }
      );
    }

    // Ensure request body is not empty
    const contentLength = request.headers.get("content-length");
    if (!contentLength || parseInt(contentLength) === 0) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    // Upload the file
    const blob = await put(filename, request.body!, {
      access: "public",
    });

    // Update user's avatar in the database
    await sql("UPDATE users SET avatar = $1 WHERE id = $2", [
      blob.url,
      jwtPayload.sub,
    ]);

    // Respond with the blob information
    return NextResponse.json(blob);
  } catch (error) {
    console.error("Error in avatar upload:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
