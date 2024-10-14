"use client";
import useSWR from "swr";
import fetcher from "../util/fetcher";

export default function Header() {
  const { data, error, isLoading } = useSWR("/api/users/profile", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return <header>{data.data.username}</header>;
}
