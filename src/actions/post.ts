"use server";

import { type Visibility } from "@prisma/client";
import { revalidatePath } from "next/cache";

import db from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { ApiError } from "next/dist/server/api-utils";

const handleError = () => {
  throw new Error("Something went wrong. Please try again.");
};

const NOT_LOGGED_IN_ERROR = "Not logged in";

export const createNewPost = async (title: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    const post = await db.post.create({
      data: {
        title,
        authorId: user.id,
      },
      select: {
        id: true,
      },
    });

    revalidatePath("/me/posts");

    return post.id;
  } catch {
    handleError();

    return;
  }
};

export const deletePost = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await db.post.delete({
      where: {
        id,
        authorId: user.id,
      },
    });

    revalidatePath("/me/posts");

    return;
  } catch {
    handleError();
  }
};

export const savePost = async (
  id: string,
  title: string,
  content: string | null,
  description: string | null,
  published: boolean
) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await db.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        title,
        content,
        description,
        published,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch {
    handleError();
  }
};

export const saveVisibility = async (id: string, visibility: Visibility) => {
  const user = await getCurrentUser();

  if (!user) throw new Error(NOT_LOGGED_IN_ERROR);

  try {
    await db.post.update({
      where: {
        id,
        authorId: user.id,
      },
      data: {
        visibility,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch {
    handleError();
  }
};

export const likePost = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Please log in to like this post.");

  try {
    await db.like.create({
      data: {
        postId: id,
        userId: user.id,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch {
    revalidatePath(`/posts/${id}`);
    handleError();
  }
};

export const unlikePost = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Please log in to unlike this post.");

  try {
    const like = await db.like.findFirst({
      where: {
        postId: id,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    if (!like) throw new Error("You have not liked this post.");

    await db.like.delete({
      where: {
        id: like?.id,
      },
    });

    revalidatePath(`/posts/${id}`);
  } catch {
    revalidatePath(`/posts/${id}`);
    handleError();
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id: id,
        published: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
            postId: true,
          },
        },
      },
    });

    if (!post) throw new Error("Post not found");

    return post;
  } catch {
    handleError();
  }
};

export const getUserPosts = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("User not found");

  try {
    const posts = await db.post.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        id: true,
        title: true,
        description: true,
        published: true,
        createdAt: true,
        likes: {
          select: {
            id: true,
          },
        },
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts) throw new Error("Posts not found");

    return posts;
  } catch {
    handleError();
  }
};

export const getPosts = async () => {
  try {
    const posts = await db.post.findMany({
      where: {
        published: true,
        visibility: "PUBLIC",
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        published: true,
        author: {
          select: {
            name: true,
            image: true,
            id: true,
          },
        },
        likes: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!posts) throw new Error("Posts not found");

    return posts;
  } catch {
    handleError();
  }
};
