"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import type { BlogComment } from "@/lib/blog";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

import LikeButton from "./LikeButton";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

interface EngagementSectionProps {
  postId: string;
  slug: string;
  likedBy: string[];
  comments: BlogComment[];
}

export default function EngagementSection({
  postId,
  slug,
  likedBy,
  comments,
}: EngagementSectionProps) {
  const { data: session, status } = useSession();
  const isSignedIn = status === "authenticated";
  const userEmail = session?.user?.email;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mt-16 space-y-16">
      {/* LIKES */}
      <LikeButton
        postId={postId}
        slug={slug}
        likedBy={likedBy}
        userEmail={userEmail}
        isSignedIn={isSignedIn}
      />

      <hr className="border-border/50" />

      {/* COMMENTS SECTION */}
      <div>
        <div className="flex items-center space-x-2 mb-8">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h3 className="text-2xl font-bold text-foreground">
            Comments ({comments.length})
          </h3>
        </div>

        {/* Comment Form */}
        <CommentForm
          postId={postId}
          slug={slug}
          isSignedIn={isSignedIn}
          mounted={mounted}
        />

        {/* Comments List */}
        <CommentList comments={comments} slug={slug} userEmail={userEmail} />
      </div>

      {/* SIGN IN PROMPT */}
      {mounted && !isSignedIn && (
        <div className="flex flex-col items-center justify-center p-8 mt-12 bg-muted/30 rounded-2xl space-y-4 border border-border/50">
          <p className="text-foreground text-center font-medium">
            Want to join the conversation and like posts?
          </p>
          <Button
            onClick={() => signIn("github")}
            variant="default"
            className="rounded-full px-6"
          >
            Sign In with GitHub
          </Button>
        </div>
      )}
    </div>
  );
}
