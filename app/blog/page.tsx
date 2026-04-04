import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical write-ups, tutorials, and thoughts on software development by Ankit Pawar.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="animate-fade-in-up mb-12">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-surface-50 mb-4">
          <span className="gradient-text">Blog</span>
        </h1>
        <p className="text-surface-400 text-lg max-w-xl">
          Technical write-ups, tutorials, and thoughts on software development.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="animate-fade-in-up animate-delay-200 text-center py-20">
          <div className="text-6xl mb-4">✍️</div>
          <h2 className="text-xl font-bold text-surface-300 mb-2">
            Coming Soon
          </h2>
          <p className="text-surface-500">
            I&apos;m working on some great content. Stay tuned!
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post, index) => (
            <div
              key={post.slug}
              className="animate-fade-in-up"
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
