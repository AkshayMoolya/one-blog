import type { Metadata } from "next";
import { redirect } from "next/navigation";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import Content from "./_components/content";
import PageHeader from "@/components/page-header";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "@/actions";
import Loading from "./_components/loading";
import UserPosts from "./_components/user-posts";

export const metadata: Metadata = {
  title: "Your posts",
};

const PostsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirect=/me/posts");
  }

  return (
    <>
      <UserPosts user={user} />
    </>
  );
};

export default PostsPage;
