import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().min(2).max(100),
    }),
    defineField({
      name: "profileImage",
      title: "Profile image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "biography",
      title: "Biography",
      type: "text",
      rows: 4,
      validation: (rule) => rule.max(500),
    }),
  ],
  preview: {
    select: { title: "name", media: "profileImage" },
  },
});
