import Post from "@/app/components/post";
import useSWR from "swr";
const followingView = true;
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
          <li className="my-5" key={post.id}>
            <Post post={post} />
          </li>
        );
      })}
    </ul>
  );
}

export default FeedList;
