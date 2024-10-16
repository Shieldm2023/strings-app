import Post from "@/app/components/post";
import useSWR from "swr";
const followingView = true;
// Function to handle post click
const handlePostClick = async (postId: number) => {
  try {
    const response = await fetch(`/api/admin/flag-misinformation/${postId}`, {
      method: "PATCH",
    });

    if (!response.ok) {
      throw new Error("Failed to flag post as misinformation");
    }

    const data = await response.json();
    console.log(data.msg);
  } catch (error) {
    console.error("Error:", error);
  }
};

function FeedList({
  index,
  followingView,
}: {
  index: number;
  followingView: boolean;
}) {
  const { data, error, isLoading } = useSWR(
    followingView
      ? `/api/posts/feed?page=${index}`
      : `/api/posts/publicfeed?page=${index}`
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <ul>
      {data.data.map((post: PostI) => {
        return (
          <li
            className="my-5 p-2.5 hover:bg-slate-900 transition duration-200 rounded"
            key={post.id}
            onClick={() => handlePostClick(post.id)}
          >
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  );
}

export default FeedList;
