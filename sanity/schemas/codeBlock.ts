import { defineType, defineField } from "sanity";

export const codeBlock = defineType({
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "TypeScript", value: "typescript" },
          { title: "JavaScript", value: "javascript" },
          { title: "Python", value: "python" },
          { title: "Bash", value: "bash" },
          { title: "CSS", value: "css" },
          { title: "HTML", value: "html" },
          { title: "JSON", value: "json" },
          { title: "YAML", value: "yaml" },
          { title: "Markdown", value: "markdown" },
          { title: "Go", value: "go" },
          { title: "Rust", value: "rust" },
          { title: "SQL", value: "sql" },
          { title: "GraphQL", value: "graphql" },
          { title: "Plain Text", value: "text" },
        ],
      },
      initialValue: "typescript",
    }),
    defineField({
      name: "filename",
      title: "Filename",
      type: "string",
      description: "Optional filename to display above the code block",
    }),
    defineField({
      name: "code",
      title: "Code",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      language: "language",
      filename: "filename",
      code: "code",
    },
    prepare({ language, filename, code }) {
      return {
        title: filename || `Code (${language || "text"})`,
        subtitle: code ? code.substring(0, 50) + "..." : "",
      };
    },
  },
});
