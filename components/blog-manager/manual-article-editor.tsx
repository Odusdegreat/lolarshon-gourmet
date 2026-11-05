"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  defineAnnotation,
  defineBlockObject,
  defineDecorator,
  defineSchema,
  defineTextBlock,
  EditorProvider,
  PortableTextEditable,
  useEditor,
} from "@portabletext/editor";
import type { PortableTextBlock } from "@portabletext/editor";
import { EventListenerPlugin, NodePlugin } from "@portabletext/editor/plugins";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { ArrowLeft, Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Quote, Save, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { BlogPost } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Choice = { id: string; name: string };
type UploadedImage = { assetId: string; url: string; alt: string };
export type ExistingArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: UploadedImage | null;
  body: PortableTextBlock[];
  authorId: string;
  categoryId: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

const editorSchema = defineSchema({
  styles: [{ name: "normal" }, { name: "h2" }, { name: "h3" }, { name: "blockquote" }],
  decorators: [{ name: "strong" }, { name: "em" }],
  annotations: [{ name: "link", fields: [{ name: "href", type: "string" }] }],
  lists: [{ name: "bullet" }, { name: "number" }],
  blockObjects: [{
    name: "image",
    fields: [
      { name: "asset", type: "object" },
      { name: "alt", type: "string" },
      { name: "assetUrl", type: "string" },
    ],
  }],
  inlineObjects: [],
});

const textBlock = defineTextBlock({
  type: "block",
  render: ({ attributes, children, node }) => {
    if (node.style === "h2") return <h2 {...attributes} className="my-4 text-2xl font-semibold">{children}</h2>;
    if (node.style === "h3") return <h3 {...attributes} className="my-3 text-xl font-semibold">{children}</h3>;
    if (node.style === "blockquote") return <blockquote {...attributes} className="my-4 border-l-2 border-champagne pl-4 italic">{children}</blockquote>;
    return <p {...attributes} className="my-3 min-h-6 leading-7">{children}</p>;
  },
});

const strongMark = defineDecorator({ type: "strong", render: ({ children }) => <strong>{children}</strong> });
const italicMark = defineDecorator({ type: "em", render: ({ children }) => <em>{children}</em> });
const linkMark = defineAnnotation({
  type: "link",
  render: ({ annotation, children }) => {
    const href = typeof annotation.href === "string" ? annotation.href : "";
    return <a href={href} className="text-brand underline">{children}</a>;
  },
});
const imageBlock = defineBlockObject({
  type: "image",
  render: ({ attributes, children, node }) => {
    const image = node as typeof node & { assetUrl?: string; alt?: string };
    return (
      <figure {...attributes} className="my-5">
        {children}
        {image.assetUrl && <Image src={image.assetUrl} alt={image.alt ?? ""} width={1200} height={800} unoptimized className="max-h-96 rounded-lg object-contain" />}
      </figure>
    );
  },
});
const editorNodes = [textBlock, strongMark, italicMark, linkMark, imageBlock];
const previewComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children }) => <h2 className="pt-4 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="pt-3 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-champagne pl-5 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal space-y-2 pl-6">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "";
      if (!/^(https?:|mailto:|tel:)/i.test(href)) return <>{children}</>;
      return <a href={href} className="text-brand underline" rel={href.startsWith("http") ? "noopener noreferrer" : undefined}>{children}</a>;
    },
  },
  types: {
    image: ({ value }) => {
      const src = typeof value.assetUrl === "string" ? value.assetUrl : "";
      if (!src) return null;
      return <Image src={src} alt={typeof value.alt === "string" ? value.alt : ""} width={1200} height={800} unoptimized className="my-5 max-h-96 rounded-lg object-contain" />;
    },
  },
};

function makeSlug(value: string) {
  return value.toLocaleLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 96);
}

function normalizeBodyForSave(body: PortableTextBlock[]) {
  return body.map((block) => {
    if (block._type !== "image") return block;
    const image = block as typeof block & { assetUrl?: string };
    const portableImage = { ...image };
    delete portableImage.assetUrl;
    return portableImage;
  });
}

function ArticleToolbar({ onAddImage, uploading }: { onAddImage: () => void; uploading: boolean }) {
  const editor = useEditor();
  const [linkError, setLinkError] = useState<string | null>(null);
  const toolbarButton = "inline-flex h-9 items-center gap-1.5 rounded-md border px-2.5 text-sm hover:bg-muted focus-visible:outline-2 focus-visible:outline-ring";
  const send = (event: Parameters<typeof editor.send>[0]) => {
    editor.send(event);
    editor.send({ type: "focus" });
  };

  function addLink() {
    const href = window.prompt("Enter a link URL (https://, http://, mailto:, or tel:)");
    if (!href) return;
    try {
      const url = new URL(href);
      if (!["https:", "http:", "mailto:", "tel:"].includes(url.protocol)) {
        setLinkError("Use an http, https, mailto, or tel URL.");
        return;
      }
    } catch {
      setLinkError("Enter a valid http, https, mailto, or tel URL.");
      return;
    }
    setLinkError(null);
    send({ type: "annotation.toggle", annotation: { name: "link", value: { href } } });
  }

  return (
    <div className="flex flex-wrap gap-2 border-b p-3" aria-label="Article formatting">
      <button type="button" className={toolbarButton} aria-label="Bold" onClick={() => send({ type: "decorator.toggle", decorator: "strong" })}><Bold aria-hidden className="size-4" /></button>
      <button type="button" className={toolbarButton} aria-label="Italic" onClick={() => send({ type: "decorator.toggle", decorator: "em" })}><Italic aria-hidden className="size-4" /></button>
      <button type="button" className={toolbarButton} onClick={() => send({ type: "style.toggle", style: "h2" })}><Heading2 aria-hidden className="size-4" />Heading 2</button>
      <button type="button" className={toolbarButton} onClick={() => send({ type: "style.toggle", style: "h3" })}><Heading3 aria-hidden className="size-4" />Heading 3</button>
      <button type="button" className={toolbarButton} onClick={() => send({ type: "style.toggle", style: "blockquote" })}><Quote aria-hidden className="size-4" />Quote</button>
      <button type="button" className={toolbarButton} onClick={() => send({ type: "list item.toggle", listItem: "bullet" })}><List aria-hidden className="size-4" />Bullets</button>
      <button type="button" className={toolbarButton} onClick={() => send({ type: "list item.toggle", listItem: "number" })}><ListOrdered aria-hidden className="size-4" />Numbered</button>
      <button type="button" className={toolbarButton} onClick={addLink}><Link2 aria-hidden className="size-4" />Link</button>
      <button type="button" className={toolbarButton} onClick={onAddImage} disabled={uploading}><ImagePlus aria-hidden className="size-4" />{uploading ? "Uploading…" : "Image"}</button>
      {linkError && <p role="alert" className="basis-full text-sm text-destructive">{linkError}</p>}
    </div>
  );
}

function PortableTextEditor({
  initialValue,
  onChange,
  onUploadImage,
  uploading,
}: {
  initialValue: PortableTextBlock[];
  onChange: (value: PortableTextBlock[]) => void;
  onUploadImage: (file: File) => Promise<{ assetId: string; url: string }>;
  uploading: boolean;
}) {
  return (
    <EditorProvider initialConfig={{ schemaDefinition: editorSchema, initialValue }}>
      <EventListenerPlugin on={(event) => {
        if (event.type === "mutation") onChange(event.value ?? []);
      }} />
      <PortableTextEditorContent onUploadImage={onUploadImage} uploading={uploading} />
    </EditorProvider>
  );
}

function PortableTextEditorContent({
  onUploadImage,
  uploading,
}: {
  onUploadImage: (file: File) => Promise<{ assetId: string; url: string }>;
  uploading: boolean;
}) {
  const editor = useEditor();
  const inputRef = useRef<HTMLInputElement>(null);
  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    try {
      const uploaded = await onUploadImage(file);
      editor.send({
        type: "insert.blocks",
        placement: "auto",
        blocks: [{
          _type: "image",
          _key: crypto.randomUUID().replaceAll("-", ""),
          asset: { _type: "reference", _ref: uploaded.assetId },
          assetUrl: uploaded.url,
          alt: file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").slice(0, 160),
        }],
      });
      editor.send({ type: "focus" });
    } catch {
      // The upload helper already presents the failure to the user.
    }
  }

  return (
    <>
      <ArticleToolbar onAddImage={() => inputRef.current?.click()} uploading={uploading} />
      <NodePlugin nodes={editorNodes} />
      <PortableTextEditable
        aria-label="Article content"
        className="min-h-72 px-5 py-4 outline-none"
        style={{ minHeight: 280 }}
      />
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={onFileChange} />
    </>
  );
}

export function ManualArticleEditor({
  categories,
  authors,
  initialArticle,
}: {
  categories: Choice[];
  authors: Choice[];
  initialArticle?: ExistingArticle;
}) {
  const router = useRouter();
  const [articleId, setArticleId] = useState(initialArticle?.id);
  const [title, setTitle] = useState(initialArticle?.title ?? "");
  const [slug, setSlug] = useState(initialArticle?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(Boolean(initialArticle?.slug));
  const [excerpt, setExcerpt] = useState(initialArticle?.excerpt ?? "");
  const [featuredImage, setFeaturedImage] = useState<UploadedImage | null>(initialArticle?.featuredImage ?? null);
  const [body, setBody] = useState<PortableTextBlock[]>(initialArticle?.body ?? []);
  const [authorId, setAuthorId] = useState(initialArticle?.authorId ?? authors[0]?.id ?? "");
  const [categoryId, setCategoryId] = useState(initialArticle?.categoryId ?? categories[0]?.id ?? "");
  const [tagsText, setTagsText] = useState(initialArticle?.tags.join(", ") ?? "");
  const [seoTitle, setSeoTitle] = useState(initialArticle?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(initialArticle?.seoDescription ?? "");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function uploadImage(file: File) {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch("/api/admin/blog-manager/upload", { method: "POST", body: formData });
      const result = await response.json() as { assetId?: string; url?: string; error?: string };
      if (!response.ok || !result.assetId || !result.url) throw new Error(result.error ?? "Image upload failed.");
      return { assetId: result.assetId, url: result.url };
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Image upload failed.");
      throw caught;
    } finally {
      setUploading(false);
    }
  }

  async function onFeaturedImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!file) return;
    try {
      const uploaded = await uploadImage(file);
      setFeaturedImage({ ...uploaded, alt: featuredImage?.alt ?? "" });
    } catch {
      // The upload helper already presents the failure to the user.
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    if (!featuredImage) {
      setError("Upload a featured image before saving the draft.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/admin/blog-manager/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(articleId ? { id: articleId } : {}),
          title,
          slug,
          excerpt,
          featuredImage: { assetId: featuredImage.assetId, alt: featuredImage.alt },
          body: normalizeBodyForSave(body),
          authorId,
          categoryId,
          tags: tagsText.split(",").map((tag) => tag.trim()).filter(Boolean),
          seoTitle,
          seoDescription,
        }),
      });
      const result = await response.json() as { id?: string; error?: string };
      if (!response.ok || !result.id) throw new Error(result.error ?? "Could not save this article.");
      setArticleId(result.id);
      setMessage("Draft saved to Sanity. It is not published.");
      router.replace(`/admin/blog-manager/create?id=${encodeURIComponent(result.id)}`);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Could not save this article.");
    } finally {
      setSaving(false);
    }
  }

  const previewArticle = {
    title,
    excerpt,
    featuredImage: featuredImage ? { asset: { _ref: featuredImage.assetId }, alt: featuredImage.alt } : null,
    body,
  } as unknown as BlogPost;

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Blog Manager</p>
          <h1 className="mt-1 text-3xl font-semibold">{articleId ? "Edit article" : "Create article"}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Save a private Sanity draft for review. Publishing remains a deliberate action in Studio.</p>
        </div>
        <Button asChild variant="outline"><Link href="/admin/blog-manager/articles"><ArrowLeft aria-hidden className="mr-2 size-4" />All articles</Link></Button>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <section className="grid gap-5 rounded-xl border border-champagne/50 bg-card p-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="article-title">Article title</Label>
            <Input id="article-title" required minLength={5} maxLength={120} value={title} onChange={(event) => {
              const nextTitle = event.currentTarget.value;
              setTitle(nextTitle);
              if (!slugEdited) setSlug(makeSlug(nextTitle));
              if (!seoTitle) setSeoTitle(nextTitle.slice(0, 60));
            }} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="article-slug">Slug</Label>
            <Input id="article-slug" required pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={96} value={slug} onChange={(event) => {
              setSlugEdited(true);
              setSlug(makeSlug(event.currentTarget.value));
            }} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="article-category">Category</Label>
            <Select id="article-category" required value={categoryId} onChange={(event) => setCategoryId(event.currentTarget.value)}>
              <option value="" disabled>Select a category</option>
              {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="article-author">Author</Label>
            <Select id="article-author" required value={authorId} onChange={(event) => setAuthorId(event.currentTarget.value)}>
              <option value="" disabled>Select an author</option>
              {authors.map((author) => <option key={author.id} value={author.id}>{author.name}</option>)}
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="article-tags">Tags</Label>
            <Input id="article-tags" placeholder="Nigerian cuisine, food culture" value={tagsText} onChange={(event) => setTagsText(event.currentTarget.value)} />
            <p className="text-xs text-muted-foreground">Separate tags with commas; up to 10 tags.</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="article-excerpt">Excerpt</Label>
            <Textarea id="article-excerpt" required minLength={30} maxLength={240} rows={3} value={excerpt} onChange={(event) => setExcerpt(event.currentTarget.value)} />
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-champagne/50 bg-card p-5">
          <div>
            <h2 className="font-semibold">Featured image</h2>
            <p className="mt-1 text-sm text-muted-foreground">JPEG, PNG, or WebP up to 8 MB.</p>
          </div>
          <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={onFeaturedImageChange} aria-label="Upload featured image" />
          {featuredImage && (
            <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
              <Image src={featuredImage.url} alt={featuredImage.alt} width={800} height={450} unoptimized className="aspect-video w-full rounded-lg object-cover" />
              <div className="space-y-2">
                <Label htmlFor="featured-alt">Featured image alt text</Label>
                <Input id="featured-alt" required maxLength={160} value={featuredImage.alt} onChange={(event) => setFeaturedImage({ ...featuredImage, alt: event.currentTarget.value })} />
              </div>
            </div>
          )}
        </section>

        <section className="overflow-hidden rounded-xl border border-champagne/50 bg-card">
          <div className="border-b p-5">
            <h2 className="font-semibold">Article content</h2>
            <p className="mt-1 text-sm text-muted-foreground">Format paragraphs, headings, lists, links, quotes, and images.</p>
          </div>
          {!preview ? (
            <PortableTextEditor initialValue={body} onChange={setBody} onUploadImage={uploadImage} uploading={uploading} />
          ) : (
            <div className="p-5">
              <article className="mx-auto max-w-3xl">
                <h2 className="font-serif text-3xl font-semibold">{title || "Article title preview"}</h2>
                <p className="mt-3 text-muted-foreground">{excerpt || "Article excerpt preview"}</p>
                {featuredImage && <Image src={featuredImage.url} alt={featuredImage.alt} width={1200} height={675} unoptimized className="my-6 aspect-video w-full rounded-xl object-cover" />}
                <div className="space-y-4 leading-7">
                  <PortableText value={previewArticle.body} components={previewComponents} />
                </div>
              </article>
            </div>
          )}
        </section>

        <section className="grid gap-5 rounded-xl border border-champagne/50 bg-card p-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="seo-title">SEO title</Label>
            <Input id="seo-title" maxLength={60} value={seoTitle} onChange={(event) => setSeoTitle(event.currentTarget.value)} />
            <p className="text-xs text-muted-foreground">{seoTitle.length}/60 characters</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="seo-description">SEO description</Label>
            <Textarea id="seo-description" maxLength={160} rows={3} value={seoDescription} onChange={(event) => setSeoDescription(event.currentTarget.value)} />
            <p className="text-xs text-muted-foreground">{seoDescription.length}/160 characters</p>
          </div>
        </section>

        {error && <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm">{error}</p>}
        {message && <p role="status" className="rounded-lg border border-green-700/30 bg-green-700/5 p-4 text-sm">{message}</p>}

        <div className="flex flex-wrap gap-3">
          <Button type="submit" disabled={saving || uploading || categories.length === 0 || authors.length === 0}>
            <Save aria-hidden className="mr-2 size-4" />{saving ? "Saving…" : "Save as Draft"}
          </Button>
          <Button type="button" variant="outline" onClick={() => setPreview((current) => !current)}>
            {preview ? <EyeOff aria-hidden className="mr-2 size-4" /> : <Eye aria-hidden className="mr-2 size-4" />}
            {preview ? "Back to Editor" : "Preview Article"}
          </Button>
          {articleId && (
            <Button asChild type="button" variant="outline">
              <Link href={`/studio/structure/blogPost;${articleId}`} target="_blank" rel="noreferrer">Review / Publish in Studio</Link>
            </Button>
          )}
        </div>
      </form>

    </div>
  );
}
