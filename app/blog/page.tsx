import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import BlogAnimations from "./BlogAnimations";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical write-ups, tutorials, and thoughts on software development by Ankit Pawar.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return <BlogAnimations posts={posts} />;
}
