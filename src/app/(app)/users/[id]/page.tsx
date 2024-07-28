import { getCurrentUser } from "@/lib/get-current-user";
import UserPosts from "./_components/user-posts";
import UsersPost from "./_components/user-posts";

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
      <UsersPost user={currentUser} id={id} />
    </>
  );
};

export default UserPage;
