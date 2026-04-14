"use server";

import { client, writeClient } from "@/lib/sanity/client";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string, slug: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      error: "You must be signed in with a valid email to like a post.",
    };
  }

  try {
    const post = await client.fetch(`*[_id == $id][0]{ likedBy }`, {
      id: postId,
    });
    const likedBy = post?.likedBy || [];
    const email = session.user.email;

    if (likedBy.includes(email)) {
      // Unlike
      await writeClient
        .patch(postId)
        .unset([`likedBy[@ == ${JSON.stringify(email)}]`])
        .commit();
    } else {
      // Like
      await writeClient
        .patch(postId)
        .setIfMissing({ likedBy: [] })
        .append("likedBy", [email])
        .commit();
    }

    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog`);
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like", error);
    return { success: false, error: "Failed to toggle like" };
  }
}

export async function submitComment(
  postId: string,
  slug: string,
  text: string,
) {
  const session = await auth();

  if (!session?.user) {
    return { success: false, error: "You must be signed in to comment." };
  }

  if (text.length > 2000) {
    return {
      success: false,
      error: "Comment is too long (maximum 2000 characters).",
    };
  }

  try {
    await writeClient.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      name: session.user.name || "Anonymous",
      email: session.user.email || "",
      image: session.user.image || "",
      text,
      published: false,
    });

    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to submit comment", error);
    return { success: false, error: "Failed to submit comment" };
  }
}

export async function deleteComment(commentId: string, slug: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, error: "You must be signed in." };
  }

  try {
    const comment = await client.fetch(`*[_id == $id][0]{ email }`, {
      id: commentId,
    });
    if (!comment || comment.email !== session.user.email) {
      return { success: false, error: "Unauthorized to delete this comment." };
    }

    await writeClient.delete(commentId);

    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete comment", error);
    return { success: false, error: "Failed to delete comment" };
  }
}
