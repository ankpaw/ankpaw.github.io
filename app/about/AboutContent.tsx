"use client";

import { Card, CardContent } from "@/components/ui/card";
import { MotionDiv, MotionSection, MotionStaggerChild } from "@/components/motion";
import { motion } from "framer-motion";
import { useTranslations } from "@/lib/i18n";

const milestoneKeys = [
  "origin",
  "engineer",
  "teamLead",
  "architect",
  "present",
] as const;

export default function AboutContent() {
  const t = useTranslations();
  const { overline, title, titleHighlight, subtitle, milestones, stats } = t.about;

  return (
    <MotionSection className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      {/* Header Section */}
      <MotionDiv custom={0} className="mb-24">
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">
            {overline}
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-foreground leading-[1.1] tracking-tight">
            {title}
            <br />
            <em className="text-muted-foreground/80 font-serif italic">{titleHighlight}</em>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl pt-2">
            {subtitle}
          </p>
        </div>
      </MotionDiv>

      {/* Elegant Offset Timeline */}
      <div className="relative">
        <motion.div
          className="space-y-12"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          animate="visible"
        >
          {milestoneKeys.map((key, index) => {
            const milestone = milestones[key];
            const isLast = index === milestoneKeys.length - 1;
            
            return (
              <MotionStaggerChild key={key}>
                <div className="relative flex flex-col md:flex-row gap-6 md:gap-12 group">
                  {/* Left Column: Timeline Year & Dot */}
                  <div className="md:w-28 flex-shrink-0 flex md:justify-end items-start relative pt-1 md:pt-4">
                    <span className="font-mono text-sm tracking-widest text-muted-foreground/70">
                      {milestone.year}
                    </span>
                    {/* The Dot */}
                    <div 
                      className={`absolute left-0 top-6 md:top-[1.35rem] md:-right-[29px] md:left-auto w-3 h-3 rounded-full border-2 ring-4 ring-background z-10 transition-colors duration-500
                      ${isLast ? "bg-emerald-500 border-emerald-400" : "bg-card border-muted-foreground/30 group-hover:border-primary group-hover:bg-primary/20"}`}
                    />
                  </div>

                  {/* Connecting Line Segment (rendered per item so mobile scales nicely) */}
                  <div className="absolute left-[5px] md:left-[118px] top-[28px] md:top-[30px] bottom-[-48px] w-px bg-border group-last:bg-gradient-to-b group-last:from-border group-last:to-transparent" />

                  {/* Right Column: Content Card */}
                  <div className="flex-1 ml-6 md:ml-0">
                    <Card className="bg-[#18181A]/40 dark:bg-[#141415]/80 border-border/40 hover:bg-[#18181A]/60 dark:hover:bg-[#1C1C1D] transition-all duration-300 hover:border-border/80">
                      <CardContent className="p-6 md:p-8">
                        <div className="mb-4">
                          <span className="font-mono text-[10px] tracking-[0.15em] text-cyan-500/80 uppercase bg-cyan-500/10 px-2.5 py-1 rounded-sm">
                            {milestone.badge}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-serif font-medium text-foreground tracking-tight mb-3">
                          {milestone.title}
                        </h2>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                          {milestone.content}
                        </p>
                        
                        {/* Tags */}
                        {milestone.tags && milestone.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-6">
                            {milestone.tags.map(tag => (
                              <span 
                                key={tag} 
                                className="font-mono text-xs text-muted-foreground/70 bg-background/50 border border-border/30 px-3 py-1.5 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </MotionStaggerChild>
            );
          })}
        </motion.div>
      </div>

      {/* Footer Stats Section */}
      <MotionDiv custom={8} className="mt-32 pt-16 border-t border-border/20">
        <div className="flex flex-wrap md:flex-nowrap gap-12 md:gap-24 justify-between md:justify-start">
          <div className="flex flex-col space-y-1">
            <span className="text-4xl md:text-5xl font-serif text-foreground">{stats.years.value}</span>
            <span className="text-sm text-muted-foreground">{stats.years.label}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-4xl md:text-5xl font-serif text-foreground">{stats.domains.value}</span>
            <span className="text-sm text-muted-foreground">{stats.domains.label}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-4xl md:text-5xl font-serif text-foreground">{stats.enterprise.value}</span>
            <span className="text-sm text-muted-foreground">{stats.enterprise.label}</span>
          </div>
        </div>
      </MotionDiv>
    </MotionSection>
  );
}
