import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BackToBlogButton, AllPostsButton } from "@/components/blog/BlogNavButtons";
import PortableTextContent from "@/components/blog/PortableTextContent";
import EngagementSection from "@/components/blog/EngagementSection";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post || !post.published) notFound();

  return (
    <article className="max-w-3xl mx-auto px-6 py-20 md:py-28">
      {/* Back link */}
      <BackToBlogButton />

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-5 uppercase tracking-[0.1em]">
          <time className="text-xs font-mono text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span className="text-muted-foreground/30">·</span>
          <span className="text-xs font-mono text-muted-foreground">{post.readingTime}</span>
        </div>

        <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] text-foreground mb-6">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] font-mono text-muted-foreground">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      {/* Content */}
      {post.body && <PortableTextContent value={post.body} />}

      {/* Engagement */}
      <EngagementSection 
        postId={post._id}
        slug={post.slug}
        likedBy={post.likedBy}
        comments={post.comments}
      />

      {/* Footer nav */}
      <Separator className="mt-16 mb-8 bg-gradient-to-r from-transparent via-border to-transparent" />
      <AllPostsButton />
    </article>
  );
}
