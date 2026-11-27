import { defineField, defineType } from "sanity";
import { isSafeBlogHref } from "@/lib/blog-links";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().min(5).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(30).max(240),
    }),
    defineField({
      name: "featuredImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description: "Describe the featured image in a few words for screen reader users and search engines.",
          validation: (rule) => rule.required().min(5).max(160),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Article body (Portable Text)",
      description: "Write the article as movable text, headings, links, lists, and inline images.",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
          marks: {
            annotations: [
              defineType({
                name: "link",
                title: "Link",
                type: "object",
                fields: [
                  {
                    name: "href",
                    title: "URL",
                    type: "string",
                    validation: (rule) => rule.required().custom((value) =>
                      typeof value === "string" && isSafeBlogHref(value)
                        ? true
                        : "Enter an http(s), mailto, tel, or site-relative URL.",
                    ),
                  },
                ],
              }),
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alternative text",
              type: "string",
              description: "Describe the image. Required for accessibility.",
              validation: (rule) => rule.required().max(160),
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption displayed below the image.",
              validation: (rule) => rule.max(240),
            }),
          ],
        },
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "bodyMarkdown",
      title: "Legacy article body (Markdown)",
      type: "text",
      rows: 12,
      description: "Kept for older articles. The website uses this only when the Portable Text body above is empty.",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.unique().max(10),
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "SEO title",
          type: "string",
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: "description",
          title: "SEO description",
          type: "text",
          rows: 2,
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: "openGraphImage",
          title: "Open Graph image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured article",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "featuredImage" },
  },
});
