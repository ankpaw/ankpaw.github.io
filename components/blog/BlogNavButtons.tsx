"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n";

export function BackToBlogButton() {
  const t = useTranslations();

  return (
    <Link href="/blog" className="inline-flex items-center gap-2 mb-10">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t.blog.backToBlog}
      </Button>
    </Link>
  );
}

export function AllPostsButton() {
  const t = useTranslations();

  return (
    <Link href="/blog" className="inline-flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className="gap-2 text-primary hover:text-primary/80 cursor-pointer"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        {t.blog.allPosts}
      </Button>
    </Link>
  );
}
