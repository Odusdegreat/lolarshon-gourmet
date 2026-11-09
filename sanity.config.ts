import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { defineConfig } from "sanity";
import { sanityConfig } from "@/sanity/lib/config";
import { schemaTypes } from "@/sanity/schemaTypes";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default defineConfig({
  ...sanityConfig,
  name: "lolarshons-gourmet",
  title: "Lolar Shon's Gourmet",
  basePath: "/studio",
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        initial: siteOrigin,
        previewMode: {
          enable: "/api/draft-mode/enable",
          shareAccess: false,
        },
      },
      resolve: {
        mainDocuments: [
          {
            route: "/blog/:slug",
            filter: '_type == "blogPost" && slug.current == $slug',
            params: ({ params }) => ({ slug: params.slug }),
          },
        ],
      },
    }),
  ],
  schema: { types: schemaTypes },
});
