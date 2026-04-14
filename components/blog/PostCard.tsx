import Link from "next/link";
import type { BlogPost } from "@/lib/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="bg-[#18181A]/40 dark:bg-[#141415]/80 border-border/40 hover:bg-[#18181A]/60 dark:hover:bg-[#1C1C1D] transition-all duration-300 hover:border-border/80 hover:-translate-y-0.5">
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <time className="text-xs font-mono text-muted-foreground tracking-wider">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="text-muted-foreground/30">·</span>
            <span className="text-xs text-muted-foreground">
              {post.readingTime}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground tracking-tight group-hover:text-primary transition-colors duration-200 mb-2">
            {post.title}
          </h2>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] font-mono text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
