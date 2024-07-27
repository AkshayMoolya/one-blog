import { getCurrentUser } from "@/lib/get-current-user";
import UserPost from "./_components/blog-card";

interface PostPageProps {
  params: {
    id: string;
  };
}

const page = async (props: PostPageProps) => {
  const { params } = props;
  const { id } = params;

  const user = await getCurrentUser();

  return (
    <>
      <UserPost id={id} user={user} />
    </>
  );
};

export default page;