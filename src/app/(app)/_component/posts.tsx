"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/actions";
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
    queryFn: () => getPosts(),
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

  return (
    <div>
      {data.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};

export default Posts;
