"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MotionDiv, MotionSection, MotionStaggerChild } from "@/components/motion";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/lib/i18n";
import { ChevronRight } from "lucide-react";

export default function ExperienceContent() {
  const t = useTranslations();
  const jobs = t.experience.jobs || [];
  
  // Track which accordion is expanded
  const [expandedId, setExpandedId] = useState<string | null>(jobs[0]?.id || null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <MotionSection className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <MotionDiv custom={0} className="mb-16 md:mb-24">
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">
            {t.experience.overline}
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold italic tracking-tight leading-[1.05] text-foreground">
            {t.experience.title} <span className="text-muted-foreground">{t.experience.titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground/80 md:text-lg leading-relaxed max-w-2xl">
            {t.experience.subtitle}
          </p>
        </div>
      </MotionDiv>

      <div className="relative pl-4 md:pl-12">
        <motion.div
          className="space-y-8"
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate="visible"
        >
          {jobs.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const isLast = index === jobs.length - 1;

            return (
              <MotionStaggerChild key={exp.id}>
                <div className="relative w-full group">
                  {/* Timeline Background Line */}
                  <div className={`absolute left-[-24px] md:left-[-32px] top-[40px] bottom-[-40px] w-px bg-border/60 ${isLast ? 'bg-gradient-to-b from-border/60 to-transparent' : ''}`} />
                  
                  {/* Glowing Timeline Dot */}
                  <div className={`absolute left-[-29px] md:left-[-37px] top-[30px] w-3 h-3 rounded-full border-2 ring-4 ring-background transition-colors duration-500 z-10 
                    ${isExpanded || (!exp.endDate) ? "bg-emerald-500 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-muted-foreground/20 border-border group-hover:border-primary/50 group-hover:bg-primary/20"}`}
                  />

                  {/* Main Interactive Card */}
                  <Card 
                    onClick={(e) => toggleExpand(exp.id, e)}
                    className={`relative cursor-pointer transition-all duration-300 border-border/40 hover:border-border/80 outline-none
                      ${isExpanded ? 'bg-[#1A1A1B]/60 dark:bg-[#18181A]/90 shadow-xl' : 'bg-[#18181A]/40 dark:bg-[#141415]/80 hover:bg-[#18181A]/60 dark:hover:bg-[#1C1C1D]'}
                    `}
                  >
                    <CardContent className="p-6 md:p-8 flex flex-col w-full relative">
                      
                      {/* Header Section (Always Visible) */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 w-full">
                        {/* Logo & Role Array */}
                        <div className="flex items-start gap-5 flex-1 min-w-0">
                          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl border border-border/50 bg-white flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden p-2.5">
                            <Image
                              src={exp.logo}
                              alt={`${exp.company} logo`}
                              width={48}
                              height={48}
                              className="object-contain w-full h-full"
                            />
                          </div>
                          
                          <div className="flex flex-col flex-1 min-w-0 mt-0.5">
                            <div className="flex items-center gap-2 group-hover:opacity-80 transition-opacity">
                              <h3 className="text-xl md:text-2xl font-serif font-medium text-foreground tracking-tight truncate max-w-full">
                                {exp.designation}
                              </h3>
                              <ChevronRight 
                                className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-300 ${isExpanded ? 'rotate-90 text-primary' : ''}`} 
                                strokeWidth={2.5}
                              />
                            </div>
                            <span className="text-muted-foreground text-sm font-medium mt-1">
                              {exp.company} <span className="mx-1.5 opacity-50">·</span> {exp.location}
                            </span>
                          </div>
                        </div>

                        {/* Date & Badge Area */}
                        <div className="flex sm:flex-col items-end justify-between sm:justify-start flex-shrink-0 mt-2 sm:mt-0 gap-2 sm:gap-1.5">
                          {!exp.endDate && (
                            <Badge variant="secondary" className="text-emerald-400 bg-emerald-500/10 border-emerald-500/20 text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 pointer-events-none">
                              {t.experience.current}
                            </Badge>
                          )}
                          <span className="text-xs font-mono tracking-wider text-muted-foreground/70">
                            {exp.startDate} — {exp.endDate ?? t.experience.present}
                          </span>
                        </div>
                      </div>

                      {/* Expanding Accordion Body */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden relative"
                          >
                            <div className="pt-8 pb-4 cursor-default" onClick={(e) => e.stopPropagation()}>
                              
                              <p className="text-foreground/80 leading-relaxed text-sm md:text-[15px] mb-8 font-medium">
                                {exp.shortDescription}
                              </p>
                              
                              <ul className="space-y-4 mb-8">
                                {exp.details?.map((detail, idx) => (
                                  <li key={idx} className="flex gap-4 items-start text-sm md:text-[15px] text-muted-foreground leading-relaxed transition-colors hover:text-muted-foreground/90">
                                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30 mt-2.5 flex-shrink-0" />
                                    <span>{detail}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Skills Container */}
                              <div className="flex flex-wrap gap-2.5 pt-6 relative">
                                {exp.skills?.map((skill) => (
                                  <span 
                                    key={skill} 
                                    className="font-mono text-xs text-muted-foreground/60 bg-transparent border border-border/30 px-3.5 py-1.5 rounded-full transition-colors hover:border-border/60 hover:text-muted-foreground"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>

                  </Card>
                </div>
              </MotionStaggerChild>
            );
          })}
        </motion.div>
      </div>
    </MotionSection>
  );
}
