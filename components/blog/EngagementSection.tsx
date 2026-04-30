"use client";

import { useState, useTransition, useEffect } from "react";
import { toggleLike, submitComment, deleteComment } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Loader2, User, Trash2 } from "lucide-react";
import type { BlogComment } from "@/lib/blog";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";

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

  const [optimisticLikedBy, setOptimisticLikedBy] = useState<Set<string>>(
    new Set(likedBy),
  );
  const [isPendingLike, startTransitionLike] = useTransition();
  const [isLikeError, setIsLikeError] = useState(false);

  const hasLiked = userEmail ? optimisticLikedBy.has(userEmail) : false;

  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  const [commentText, setCommentText] = useState("");
  const [isPendingComment, startTransitionComment] = useTransition();
  const [commentMessage, setCommentMessage] = useState({
    text: "",
    isError: false,
  });

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    setDeletingCommentId(commentId);
    await deleteComment(commentId, slug);
    setDeletingCommentId(null);
  };

  const handleLike = () => {
    if (isPendingLike || !userEmail) return;

    // Optimistic toggle
    setOptimisticLikedBy((prev) => {
      const next = new Set(prev);
      if (hasLiked) {
        next.delete(userEmail);
      } else {
        next.add(userEmail);
      }
      return next;
    });
    setIsLikeError(false);

    startTransitionLike(async () => {
      const res = await toggleLike(postId, slug);
      if (!res.success) {
        setIsLikeError(true);
        // revert optimistic
        setOptimisticLikedBy((prev) => {
          const next = new Set(prev);
          if (!hasLiked) {
            next.delete(userEmail);
          } else {
            next.add(userEmail);
          }
          return next;
        });
      }
    });
  };

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
    <div className="mt-16 space-y-16">
      {/* LIKES */}
      <div className="flex flex-col items-center justify-center space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          Did you enjoy this post?
        </h3>
        <motion.div whileTap={{ scale: 0.9 }}>
          <Button
            onClick={handleLike}
            disabled={isPendingLike || !isSignedIn}
            variant="outline"
            className="flex items-center space-x-2 rounded-full px-6 py-6 border-primary/20 hover:border-primary/50"
            aria-pressed={hasLiked}
            aria-label={
              hasLiked
                ? `Unlike post (${optimisticLikedBy.size} likes)`
                : `Like post (${optimisticLikedBy.size} likes)`
            }
            title={!isSignedIn ? "Sign in to like this post" : undefined}
          >
            <Heart
              aria-hidden="true"
              className={`w-5 h-5 transition-colors ${hasLiked ? "text-red-500 fill-red-500" : "text-muted-foreground"}`}
            />
            <span className="text-lg font-bold">{optimisticLikedBy.size}</span>
          </Button>
        </motion.div>
        {isLikeError && (
          <p className="text-sm text-destructive">
            Failed to like. Please sign in with GitHub.
          </p>
        )}
      </div>

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
                    commentMessage.isError
                      ? "text-destructive"
                      : "text-green-500"
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

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((c) => (
            <div
              key={c._id}
              className="flex space-x-4 p-5 rounded-2xl bg-muted/30 border border-border/50"
            >
              {c.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-primary" />
                </div>
              )}
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{c.name}</h4>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c._createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  {userEmail === c.email && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteComment(c._id)}
                      disabled={deletingCommentId === c._id}
                      aria-label="Delete comment"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      {deletingCommentId === c._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
                <p className="text-muted-foreground text-sm whitespace-pre-wrap">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-center text-muted-foreground py-10 italic">
              No comments yet. Be the first to start the discussion!
            </p>
          )}
        </div>
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
