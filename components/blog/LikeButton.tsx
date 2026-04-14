"use client";

import { useState, useTransition } from "react";
import { toggleLike } from "@/app/actions/blog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface LikeButtonProps {
  postId: string;
  slug: string;
  likedBy: string[];
  userEmail: string | null | undefined;
  isSignedIn: boolean;
}

export default function LikeButton({
  postId,
  slug,
  likedBy,
  userEmail,
  isSignedIn,
}: LikeButtonProps) {
  const [optimisticLikedBy, setOptimisticLikedBy] = useState<Set<string>>(
    new Set(likedBy),
  );
  const [isPendingLike, startTransitionLike] = useTransition();
  const [isLikeError, setIsLikeError] = useState(false);

  const hasLiked = userEmail ? optimisticLikedBy.has(userEmail) : false;

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

  return (
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
          aria-label={`${hasLiked ? "Unlike" : "Like"} post, ${optimisticLikedBy.size} likes`}
          title={!isSignedIn ? "Please sign in to like posts" : ""}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${hasLiked ? "text-red-500 fill-red-500" : "text-muted-foreground"}`}
            aria-hidden="true"
          />
          <span className="text-lg font-bold">{optimisticLikedBy.size}</span>
        </Button>
      </motion.div>
      {isLikeError && (
        <p className="text-sm text-destructive">
          Failed to like. Please try again.
        </p>
      )}
    </div>
  );
}
