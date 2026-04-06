"use client";

import type { BlogPost } from "@/lib/blog";
import PostCard from "@/components/blog/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { MotionDiv, MotionSection, MotionStaggerChild } from "@/components/motion";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";

export default function BlogAnimations({ posts }: { posts: BlogPost[] }) {
  const t = useTranslations();

  return (
    <MotionSection className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <MotionDiv custom={0} className="mb-16 md:mb-24">
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">
            {t.blog.overline}
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold italic tracking-tight leading-[1.05] text-foreground">
            {t.blog.title}
          </h1>
          <p className="text-muted-foreground/80 md:text-lg leading-relaxed max-w-2xl">
            {t.blog.subtitle}
          </p>
        </div>
      </MotionDiv>

      {posts.length === 0 ? (
        <MotionDiv custom={1}>
          <Card className="bg-card/50 border-border">
            <CardContent className="text-center py-20 px-6">
              <div className="text-6xl mb-6">✍️</div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                {t.blog.comingSoon}
              </h2>
              <p className="text-muted-foreground max-w-sm mx-auto">
                {t.blog.comingSoonText}
              </p>
            </CardContent>
          </Card>
        </MotionDiv>
      ) : (
        <motion.div
          className="grid gap-6"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => (
            <MotionStaggerChild key={post.slug}>
              <PostCard post={post} />
            </MotionStaggerChild>
          ))}
        </motion.div>
      )}
    </MotionSection>
  );
}
