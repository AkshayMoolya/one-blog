import { cn } from "@/lib/utils";
import Image, { type ImageProps } from "next/image";

type UserAvatarProps = {
  userId: string;
  src: string | null;
  alt: string | null;
  className?: string;
  height?: number;
  width?: number;
} & Omit<ImageProps, "src" | "alt">;

const UserAvatar = (props: UserAvatarProps) => {
  const { userId, src, alt, className, width, height, ...rest } = props;

  return (
    <Image
      src={src ?? `https://robohash.org/${userId}`}
      alt={alt ?? `${userId}'s avatar`}
      width={width ?? 24}
      height={height ?? 24}
      className={cn(
        "rounded-full items-center justify-center object-cover",
        className
      )}
      quality={100}
      {...rest}
    />
  );
};

export default UserAvatar;
