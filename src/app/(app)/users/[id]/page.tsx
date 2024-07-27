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

export const generateMetadata = async (
  props: UserPageProps
): Promise<Metadata> => {
  const { params } = props;
  const id = params.id;
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return {};
  }

  return {
    title: user.name || user.id,
    description: user.bio,
    openGraph: {
      title: user.name || user.id,
      description: user.bio || undefined,
      type: "profile",
      url: `${SITE_URL}/users/${user.id}`,
    },
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
