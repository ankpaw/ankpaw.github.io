import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAllPostsIncludingDrafts } from "@/lib/blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage blog posts and site content.",
};

export default async function AdminPage() {
  const session = await auth();

  if (!session) redirect("/api/auth/signin");
  const role = (session.user as { role?: string })?.role;
  if (role !== "admin") redirect("/");

  const posts = getAllPostsIncludingDrafts();

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="animate-fade-in-up mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-black tracking-tight text-surface-50">
            Admin Dashboard
          </h1>
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-accent-500/10 text-accent-400 border border-accent-500/20">
            {session.user?.name}
          </span>
        </div>
        <p className="text-surface-400">
          Manage your blog posts. Create MDX files in{" "}
          <code className="text-primary-400 bg-surface-800 px-2 py-0.5 rounded text-sm font-mono">
            content/blog/
          </code>{" "}
          and they&apos;ll appear here.
        </p>
      </div>

      {/* Stats */}
      <div className="animate-fade-in-up animate-delay-100 grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-xl bg-surface-900/50 border border-surface-800">
          <p className="text-3xl font-black text-surface-50">
            {posts.length}
          </p>
          <p className="text-surface-500 text-sm mt-1">Total Posts</p>
        </div>
        <div className="p-5 rounded-xl bg-surface-900/50 border border-surface-800">
          <p className="text-3xl font-black text-accent-400">
            {posts.filter((p) => p.published).length}
          </p>
          <p className="text-surface-500 text-sm mt-1">Published</p>
        </div>
        <div className="p-5 rounded-xl bg-surface-900/50 border border-surface-800">
          <p className="text-3xl font-black text-yellow-400">
            {posts.filter((p) => !p.published).length}
          </p>
          <p className="text-surface-500 text-sm mt-1">Drafts</p>
        </div>
      </div>

      {/* Posts Table */}
      <div className="animate-fade-in-up animate-delay-200">
        <h2 className="text-lg font-bold text-surface-200 mb-4">All Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12 text-surface-500">
            <p>
              No posts yet. Create an MDX file in{" "}
              <code className="text-primary-400">content/blog/</code> to get
              started.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-surface-800 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-900/80 border-b border-surface-800">
                  <th className="px-5 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wider hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold text-surface-400 uppercase tracking-wider text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-surface-800 last:border-0 hover:bg-surface-900/50 transition-colors"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-surface-200">
                      {post.title}
                    </td>
                    <td className="px-5 py-4 text-sm text-surface-500 hidden sm:table-cell font-mono">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-5 py-4">
                      {post.published ? (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent-500/10 text-accent-400">
                          Published
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-500/10 text-yellow-400">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary-400 text-sm hover:text-primary-300 transition-colors"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
