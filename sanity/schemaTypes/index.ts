import { author } from "@/sanity/schemaTypes/author";
import { blogGenerationRequest } from "@/sanity/schemaTypes/blogGenerationRequest";
import { blogPost } from "@/sanity/schemaTypes/blogPost";
import { category } from "@/sanity/schemaTypes/category";

export const schemaTypes = [blogPost, author, category, blogGenerationRequest];
