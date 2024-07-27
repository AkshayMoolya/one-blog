import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";

import Form from "./_components/form";
import FormWrapper from "./_components/form-warpper";

interface EditorPageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Editor",
};

const EditorPage = async (props: EditorPageProps) => {
  const { params } = props;
  const { id } = params;

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/login?redirect=/editor/${id}`);
  }

  // const post = await db.post.findUnique({
  //   where: {
  //     id,
  //   },
  // });

  // if (!post) {
  //   notFound();
  // }

  return <FormWrapper id={id} />;
};

export default EditorPage;
