import { defineField, defineType } from "sanity";

export const blogGenerationRequest = defineType({
  name: "blogGenerationRequest",
  title: "AI blog generation request",
  type: "document",
  fields: [
    defineField({
      name: "batchId",
      title: "Generation batch ID",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "topicIndex",
      title: "Position in batch",
      type: "number",
      validation: (rule) => rule.integer().min(0).max(4),
    }),
    defineField({
      name: "topic",
      title: "Requested topic",
      type: "string",
      validation: (rule) => rule.required().min(3).max(180),
    }),
    defineField({
      name: "topicDescription",
      title: "Additional topic direction",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Draft created", value: "draftCreated" },
          { title: "Failed", value: "failed" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "requestedAt",
      title: "Date requested",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "articleTitle",
      title: "Generated article title",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "articleSlug",
      title: "Generated article slug",
      type: "string",
      validation: (rule) => rule.max(96),
    }),
    defineField({
      name: "errorMessage",
      title: "Failure details",
      type: "text",
      rows: 3,
      validation: (rule) => rule.max(500),
    }),
  ],
  preview: {
    select: { title: "articleTitle", subtitle: "topic" },
    prepare({ title, subtitle }) {
      return { title: title || subtitle || "Untitled generation request", subtitle };
    },
  },
});
