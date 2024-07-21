import PostPlaceholder from "@/components/post-placeholder";
import * as React from "react";
import Posts from "./_component/posts";
import { getCurrentUser } from "@/lib/get-current-user";
// import { type User } from "next-auth";

export default async function Home() {
  const user = await getCurrentUser();

  return <Posts user={user} />;
}
