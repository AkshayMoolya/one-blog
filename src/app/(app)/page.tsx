import PostPlaceholder from "@/components/post-placeholder";
import * as React from "react";
import Posts from "./_component/posts";

export default function Home() {
  return (
    <React.Suspense
      fallback={Array.from({ length: 5 }, (_, i) => (
        <PostPlaceholder key={i} />
      ))}
    >
      <Posts />
    </React.Suspense>
  );
}
