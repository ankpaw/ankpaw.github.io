"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "@/lib/i18n";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";

const techStack = [
  "React", "TypeScript", "Micro Frontends", "Next.js", "Node.js", "Webpack", "Storybook", "MCP",
];

export default function Home() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);

  // Raw mouse position (0–1 normalized)
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Spring-smoothed — slow, silky follow
  const x = useSpring(rawX, { stiffness: 50, damping: 18, mass: 1.2 });
  const y = useSpring(rawY, { stiffness: 50, damping: 18, mass: 1.2 });

  // Map 0–1 to CSS percent strings for the primary orb
  const orb1Left = useTransform(x, [0, 1], ["10%", "90%"]);
  const orb1Top  = useTransform(y, [0, 1], ["10%", "90%"]);

  // Secondary orb moves inversely for depth
  const orb2Left = useTransform(x, [0, 1], ["80%", "20%"]);
  const orb2Top  = useTransform(y, [0, 1], ["80%", "20%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <MotionSection
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center hero-glow dot-grid"
    >
      {/* Orb 1 — indigo, tracks pointer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          width: 700,
          height: 700,
          left: orb1Left,
          top: orb1Top,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, oklch(0.62 0.22 277 / 0.25) 0%, transparent 70%)",
          filter: "blur(72px)",
        }}
      />
      {/* Orb 2 — emerald, moves opposite for depth */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-0 rounded-full"
        style={{
          width: 500,
          height: 500,
          left: orb2Left,
          top: orb2Top,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, oklch(0.68 0.18 162 / 0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 w-full">
        <MotionDiv custom={0}>
          <div className="flex flex-col space-y-6">
            <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">
              {t.home.overline}
            </span>
            <h1 className="font-serif text-[clamp(3.5rem,8vw,6.5rem)] font-bold italic tracking-tight leading-[1.05] text-foreground">
              {t.home.name}
              <span className="gradient-text ml-2">.</span>
            </h1>
          </div>
        </MotionDiv>

        <MotionDiv custom={2}>
          <h2 className="mt-8 text-xl sm:text-2xl md:text-3xl font-semibold text-muted-foreground leading-tight tracking-tight">
            {t.home.tagline}
          </h2>
        </MotionDiv>

        <MotionDiv custom={3} className="mt-6 max-w-2xl">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {t.home.bio}
          </p>
        </MotionDiv>

        {/* Tech Stack */}
        <MotionDiv custom={4} className="mt-10 flex flex-wrap gap-2.5">
          {techStack.map((tech) => (
            <span key={tech} className="font-mono text-xs text-muted-foreground/80 bg-background/50 border border-border/30 px-3 py-1.5 rounded-full">
              {tech}
            </span>
          ))}
        </MotionDiv>

        {/* CTAs */}
        <MotionDiv custom={5} className="mt-10 flex flex-wrap gap-4">
          <a href="mailto:iamankitpawar@gmail.com">
            <Button size="lg" className="gap-2 px-6 cursor-pointer text-sm">
              {t.home.getInTouch}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </a>
          <Link href="/blog">
            <Button variant="outline" size="lg" className="px-6 cursor-pointer text-sm">
              {t.home.readBlog}
            </Button>
          </Link>
        </MotionDiv>

        {/* Social strip */}
        <MotionDiv custom={6} className="mt-12 flex items-center gap-4">
          <div className="h-px w-12 bg-border" />
          <div className="flex gap-3">
            {[
              { href: "https://github.com/ankpaw", label: "GitHub", d: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" },
              { href: "https://www.linkedin.com/in/iamankitpawar/", label: "LinkedIn", d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
              { href: "https://twitter.com/ap9064", label: "Twitter", d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
            ].map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
