import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="p-6 rounded-xl bg-surface-900/50 border border-surface-800 hover:border-primary-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary-950/30 hover:-translate-y-0.5">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <time className="text-xs font-mono text-surface-500 tracking-wider">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-surface-700">·</span>
          <span className="text-xs text-surface-500">{post.readingTime}</span>
        </div>

        <h2 className="text-xl font-bold text-surface-100 group-hover:text-primary-400 transition-colors duration-200 mb-2">
          {post.title}
        </h2>

        <p className="text-surface-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
