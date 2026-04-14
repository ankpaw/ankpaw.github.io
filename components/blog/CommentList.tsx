"use client";

import { useState } from "react";
import { deleteComment } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Loader2, User, Trash2 } from "lucide-react";
import type { BlogComment } from "@/lib/blog";

interface CommentListProps {
  comments: BlogComment[];
  slug: string;
  userEmail: string | null | undefined;
}

export default function CommentList({
  comments,
  slug,
  userEmail,
}: CommentListProps) {
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
    null,
  );

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    setDeletingCommentId(commentId);
    await deleteComment(commentId, slug);
    setDeletingCommentId(null);
  };

  return (
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
  );
}
