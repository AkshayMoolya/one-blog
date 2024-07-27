"use client";

import { getPosts } from "@/actions";
import { useQuery } from "@tanstack/react-query";
import PostCard from "./post-card";
import { type User } from "next-auth";
import React from "react";
import PostPlaceholder from "@/components/post-placeholder";

interface PostsProps {
  user: User | null | undefined;
}

const Posts = ({ user }: PostsProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => await getPosts(),
  });

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 10 }).map((_, i) => (
          <PostPlaceholder key={i} />
        ))}
      </>
    );
  }

  if (error) {
    return <div>Error loading posts. Please try again later.</div>;
  }

  if (!data || data.length === 0) {
    return <div>No posts found.</div>;
  }

  console.log(user?.isAdmin, "user");

  console.log("Data:", data);
  return (
    <div>
      {data &&
        data.map((post) => (
          <PostCard key={post.id} post={post} user={user} queryKey={"posts"} />
        ))}
    </div>
  );
};

export default Posts;
