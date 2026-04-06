import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(
  `*[_type == "post" && published == true] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    tags,
    published,
    "readingTime": round(length(pt::text(body)) / 5 / 200) + " min read"
  }`
);

export const POST_QUERY = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    tags,
    published,
    body,
    likedBy,
    "comments": *[_type == "comment" && post._ref == ^._id && published == true] | order(_createdAt asc) {
      _id,
      name,
      email,
      image,
      text,
      _createdAt
    },
    "readingTime": round(length(pt::text(body)) / 5 / 200) + " min read"
  }`
);

export const POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && published == true] { "slug": slug.current }`
);

export const ALL_POSTS_QUERY = defineQuery(
  `*[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    date,
    tags,
    published,
    "readingTime": round(length(pt::text(body)) / 5 / 200) + " min read"
  }`
);
