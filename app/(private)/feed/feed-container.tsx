import { useState } from "react";
import FeedList from "./feed-list";

function FeedContainer() {
  const [cnt, setCnt] = useState(1);
  const [followingView, setFollowingView] = useState(true);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(<FeedList index={i} followingView={followingView} key={i} />);
  }

  return (
    <div>
      <div className="flex justify-center mt-4 mb-4 space-x-4">
        {" "}
        {}
        <span
          onClick={() => setFollowingView(true)}
          className={`text-white-800 cursor-pointer ${
            followingView ? "underline" : ""
          }`}
        >
          Following
        </span>
        <span
          onClick={() => setFollowingView(false)}
          className={`text-white-800 cursor-pointer ${
            !followingView ? "underline" : ""
          }`}
        >
          Latest
        </span>
      </div>
      {pages}
      <div className="flex justify-center space-x-2">
        <button
          className="dark:bg-slate-900 bg-slate-400 p-2 rounded-lg"
          onClick={() => setCnt(cnt + 1)}
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default FeedContainer;
