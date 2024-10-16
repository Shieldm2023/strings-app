"use client";

import type { PutBlobResult } from "@vercel/blob";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const router = useRouter();
  return (
    <>
      <h1>Upload Your Avatar</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const file = (inputFileRef.current?.files)![0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: "POST",
              body: file,
            }
          );

          const newBlob = (await response.json()) as PutBlobResult;
          router.push("/account");

          // setBlob(newBlob);
        }}
      >
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          {}
          <img
            src={blob.url}
            alt="Uploaded Blob"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {}
          <div>
            Blob URL:{" "}
            <a href={blob.url} target="_blank" rel="noopener noreferrer">
              {blob.url}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
