"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MotionDiv, MotionSection } from "@/components/motion";
import { useTranslations } from "@/lib/i18n";

const socialLinks = [
  {
    href: "mailto:iamankitpawar@gmail.com",
    label: "Email",
    value: "iamankitpawar@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "https://github.com/ankpaw",
    label: "GitHub",
    value: "github.com/ankpaw",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/iamankitpawar/",
    label: "LinkedIn",
    value: "linkedin.com/in/iamankitpawar",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function ContactContent() {
  const t = useTranslations();

  return (
    <MotionSection className="max-w-5xl mx-auto px-6 py-20 md:py-28">
      <MotionDiv custom={0} className="mb-16 md:mb-24">
        <div className="flex flex-col space-y-6">
          <span className="font-mono text-xs md:text-sm tracking-[0.2em] text-muted-foreground uppercase">
            {t.contact.overline}
          </span>
          <h1 className="font-serif text-[clamp(2.5rem,5.5vw,4.5rem)] font-bold italic tracking-tight leading-[1.05] text-foreground">
            {t.contact.title} <span className="text-muted-foreground">{t.contact.titleHighlight}</span>
          </h1>
          <p className="text-muted-foreground/80 md:text-lg leading-relaxed max-w-2xl">
            {t.contact.subtitle}
          </p>
        </div>
      </MotionDiv>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Contact Form */}
        <MotionDiv custom={1} className="md:col-span-3">
          <Card className="bg-[#18181A]/40 dark:bg-[#141415]/80 border-border/40">
            <CardContent className="p-6 md:p-8">
              <form action="mailto:iamankitpawar@gmail.com" className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/80">
                    {t.contact.emailLabel}
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder={t.contact.emailPlaceholder}
                    required
                    className="h-11 bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/80">
                    {t.contact.subjectLabel}
                  </label>
                  <Input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder={t.contact.subjectPlaceholder}
                    required
                    className="h-11 bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground/80">
                    {t.contact.messageLabel}
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder={t.contact.messagePlaceholder}
                    className="bg-background/50 min-h-[150px] resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto gap-2 px-8 cursor-pointer">
                  {t.contact.sendMessage}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </form>
            </CardContent>
          </Card>
        </MotionDiv>

        {/* Social Panel */}
        <MotionDiv custom={2} className="md:col-span-2">
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
              >
                <Card className="bg-[#18181A]/40 dark:bg-[#141415]/80 border-border/40 hover:bg-[#18181A]/60 dark:hover:bg-[#1C1C1D] transition-all duration-300 hover:border-border/80 group cursor-pointer mb-4">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {link.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{link.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{link.value}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
