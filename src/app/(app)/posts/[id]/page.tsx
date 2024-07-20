import { getCurrentUser } from "@/lib/get-current-user";
import UserPost from "./_components/user-post";

type PostPageProps = {
  params: {
    id: string;
  };
};

const page = async (props: PostPageProps) => {
  const { params } = props;
  const { id } = params;

  const user = await getCurrentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return (
    <>
      <UserPost id={id} user={user} />
    </>
  );
};

export default page;
