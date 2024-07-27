import { type Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import UserPosts from "./_components/user-posts";

type UserPageProps = {
  params: {
    id: string;
  };
};

const UserPage = async (props: UserPageProps) => {
  const { params } = props;
  const { id } = params;
  const currentUser = await getCurrentUser();

  return (
    <>
      <UserPosts user={currentUser} id={id} />
    </>
  );
};

export default UserPage;
