import type { Metadata } from "next";
import { redirect } from "next/navigation";
import * as React from "react";

import { getCurrentUser } from "@/lib/get-current-user";
import LoginButton from "./_component/login-button";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to One Blog",
};

const LoginPage = async () => {
  const user = await getCurrentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <div className="text-2xl font-semibold">Log in</div>
      <p className="text-muted-foreground">to continue to One Blog</p>
      <LoginButton />
    </div>
  );
};

export default LoginPage;
