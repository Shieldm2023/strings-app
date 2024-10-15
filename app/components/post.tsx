import Image from "next/image";
import Link from "next/link";

function Post({ post, showEditBtn }: { post: PostI; showEditBtn?: boolean }) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const createdAt = new Date(post.created_at);

  // Truncate the post content to 400 characters
  const truncatedContent =
    post.content.length > 400
      ? post.content.substring(0, 400) + "..."
      : post.content;

  return (
    <div className="flex flex-row">
      <div>
        {post.avatar && (
          <Link href={`/${post.username}`}>
            <Image
              src={post.avatar}
              width={50}
              height={50}
              alt={post.username}
              className="rounded-full mr-3"
            />
          </Link>
        )}
        {!post.avatar && (
          <div
            className="bg-slate-600 rounded-full mr-3"
            style={{ width: 50, height: 50 }}
          ></div>
        )}
      </div>
      <div className="flex flex-col max-w-xs">
        <div className="font-bold">
          <Link href={`/${post.username}`}>{post.username}</Link>
        </div>
        <div className="dark:text-slate-400 text-slate-600">
          {createdAt.toLocaleDateString("en-us", options)}
        </div>
        <div className="text-sm break-words max-w-full">{truncatedContent}</div>
      </div>
      {showEditBtn && (
        <div className="text-right flex-grow">
          <Link
            href={`/profile/edit-post/${post.id}`}
            className="dark:text-green-400 text-green-800"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}

export default Post;
