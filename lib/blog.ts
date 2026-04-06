import { client, POSTS_QUERY, POST_QUERY, POST_SLUGS_QUERY, ALL_POSTS_QUERY } from "./sanity";
import type { PortableTextBlock } from "@portabletext/react";

export interface BlogComment {
  _id: string;
  name: string;
  email: string;
  image?: string;
  text: string;
  _createdAt: string;
}

export interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  published: boolean;
  readingTime: string;
  body?: PortableTextBlock[];
  likedBy: string[];
  comments: BlogComment[];
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const posts = await client.fetch(POSTS_QUERY, {}, { next: { revalidate: 60 } });
  return (posts ?? []).map(mapPost);
}

export async function getAllPostsIncludingDrafts(): Promise<BlogPost[]> {
  const posts = await client.fetch(ALL_POSTS_QUERY, {}, { next: { revalidate: 60 } });
  return (posts ?? []).map(mapPost);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await client.fetch(POST_QUERY, { slug }, { next: { revalidate: 60 } });
  if (!post) return null;
  return mapPost(post);
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await client.fetch(POST_SLUGS_QUERY, {}, { next: { revalidate: 60 } });
  return (slugs ?? []).map((s: { slug: string }) => s.slug);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPost(raw: any): BlogPost {
  return {
    _id: raw._id ?? "",
    slug: raw.slug ?? "",
    title: raw.title ?? "Untitled",
    date: raw.date ?? new Date().toISOString(),
    excerpt: raw.excerpt ?? "",
    tags: raw.tags ?? [],
    published: raw.published ?? false,
    readingTime: raw.readingTime ?? "1 min read",
    body: raw.body,
    likedBy: raw.likedBy ?? [],
    comments: raw.comments ?? [],
  };
}
