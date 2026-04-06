"use client";

import {
  PortableText,
  type PortableTextReactComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import type { ComponentPropsWithoutRef } from "react";
import { urlForImage } from "@/lib/sanity/image";

interface CodeBlockValue {
  _type: "codeBlock";
  language?: string;
  filename?: string;
  code: string;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-black text-foreground mt-10 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold text-foreground/90 mt-8 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-foreground/80 mt-6 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-muted-foreground leading-relaxed mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-primary pl-4 my-6 text-muted-foreground italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-5 space-y-2 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-5 space-y-2 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="font-mono text-sm bg-muted px-1.5 py-0.5 rounded text-primary">
        {children}
      </code>
    ),
    underline: ({ children }) => <span className="underline">{children}</span>,
    "strike-through": ({ children }) => (
      <span className="line-through">{children}</span>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        className="text-primary hover:text-primary/80 underline underline-offset-3 transition-colors"
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    codeBlock: ({ value }: { value: CodeBlockValue }) => (
      <div className="my-6">
        {value.filename && (
          <div className="bg-muted/80 border border-border border-b-0 rounded-t-xl px-4 py-2 text-xs font-mono text-muted-foreground">
            {value.filename}
          </div>
        )}
        <pre
          className={`bg-muted border border-border ${
            value.filename ? "rounded-b-xl" : "rounded-xl"
          } p-5 overflow-x-auto text-sm leading-relaxed`}
        >
          <code className="font-mono text-foreground/90">{value.code}</code>
        </pre>
      </div>
    ),
    image: ({
      value,
    }: {
      value: {
        alt?: string;
        caption?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        asset?: any;
      } & ComponentPropsWithoutRef<"img">;
    }) => {
      const src = value.src || (value.asset ? urlForImage(value)?.url() : "");

      if (!src) return null;

      return (
        <figure className="my-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-xl max-w-full"
            alt={value.alt || ""}
            src={src}
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

export default function PortableTextContent({
  value,
}: {
  value: PortableTextBlock[];
}) {
  return (
    <div className="prose">
      <PortableText value={value} components={components} />
    </div>
  );
}
