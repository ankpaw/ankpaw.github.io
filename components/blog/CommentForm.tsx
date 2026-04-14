"use client";

import { useState, useTransition } from "react";
import { submitComment } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface CommentFormProps {
  postId: string;
  slug: string;
  isSignedIn: boolean;
  mounted: boolean;
}

export default function CommentForm({
  postId,
  slug,
  isSignedIn,
  mounted,
}: CommentFormProps) {
  const [commentText, setCommentText] = useState("");
  const [isPendingComment, startTransitionComment] = useTransition();
  const [commentMessage, setCommentMessage] = useState({
    text: "",
    isError: false,
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setCommentMessage({ text: "", isError: false });
    startTransitionComment(async () => {
      const res = await submitComment(postId, slug, commentText);
      if (res.success) {
        setCommentMessage({
          text: "Comment submitted for review!",
          isError: false,
        });
        setCommentText("");
      } else {
        setCommentMessage({
          text: res.error || "Failed to post comment",
          isError: true,
        });
      }
    });
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mb-12 space-y-4">
      <Textarea
        placeholder="What are your thoughts?"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        disabled={!mounted || isPendingComment || !isSignedIn}
        className="min-h-[100px] resize-y bg-muted/50 border-border focus:bg-background transition-colors p-4 rounded-xl"
        aria-label="Add a comment"
      />
      <div className="flex justify-between items-center">
        <span className="text-sm">
          {commentMessage.text && (
            <span
              className={
                commentMessage.isError ? "text-destructive" : "text-green-500"
              }
            >
              {commentMessage.text}
            </span>
          )}
        </span>
        <Button
          type="submit"
          disabled={isPendingComment || !commentText.trim()}
          className="rounded-xl px-6"
        >
          {isPendingComment && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Post Comment
        </Button>
      </div>
    </form>
  );
}
