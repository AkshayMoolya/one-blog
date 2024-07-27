"use client";

import Controls from "@/app/(app)/_component/controls";
import Back from "@/components/back";
import UserAvatar from "@/components/shared/user-avatar";
import { formatPostDate } from "@/utilis/format-post-date";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import SafeHtml from "./safe-html";
import LikeButton from "@/components/shared/like-button";
import { getPostById } from "@/actions";
import UserPostPlaceholder from "@/components/user-post-placeholder";
import { notFound } from "next/navigation";

interface userPostProps {
  id: string;
  user: User | undefined;
}
const Blogcard = ({ id, user }: userPostProps) => {
  console.log(id);
  const { data, isLoading, error } = useQuery({
    queryKey: ["getpostbyid", id],
    queryFn: async () => await getPostById(id),
  });

  if (error) {
    console.error("Error fetching post:", error);

    // give a msg to the user that the post is not found
    return notFound();
  }

  if (!data) {
    return Array.from({ length: 1 }, (_, i) => <UserPostPlaceholder key={i} />);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const { title, description, content, createdAt, author, likes } = data;
  return (
    <>
      <div className="flex items-center justify-between">
        <Back />
        <Controls
          id={id}
          user={user}
          authorId={author.id}
          postTitle={title}
          querykey="posts"
        />
      </div>
      <div className="my-8">
        <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
        <p className="mt-4 text-muted-foreground">{description}</p>
      </div>
      <Link href={`/users/${author.id}`} className="flex items-center gap-3">
        <UserAvatar
          width={40}
          height={40}
          src={author.image}
          alt={author.name}
          userId={author.id}
        />
        <div className="text-sm">
          <div>{author.name}</div>
          <div className="text-xs text-muted-foreground">
            {formatPostDate(createdAt)}
          </div>
        </div>
      </Link>

      <div className="my-8">
        <SafeHtml html={content || ""} />
      </div>
      <LikeButton likes={likes} user={user} postId={id} />
    </>
  );
};

export default Blogcard;