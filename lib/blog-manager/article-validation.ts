import "server-only";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const assetIdPattern = /^image-[a-zA-Z0-9_-]+$/;
const portableKeyPattern = /^[a-zA-Z0-9_-]{1,128}$/;

export type ArticleDraftInput = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: { assetId: string; alt: string };
  body: Record<string, unknown>[];
  authorId: string;
  categoryId: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, min: number, max: number): value is string {
  return typeof value === "string" && value.trim().length >= min && value.trim().length <= max;
}

function validKey(value: unknown): value is string {
  return typeof value === "string" && portableKeyPattern.test(value);
}

function normalizeTextBlock(block: Record<string, unknown>) {
  if (!Array.isArray(block.children) || block.children.length > 1000) return null;
  const children: Record<string, unknown>[] = [];
  for (const child of block.children) {
    if (!isRecord(child) || child._type !== "span" || !text(child.text, 0, 20_000)) return null;
    if (!Array.isArray(child.marks) || !child.marks.every((mark) => typeof mark === "string" && validKey(mark))) return null;
    children.push({
      _type: "span",
      _key: validKey(child._key) ? child._key : crypto.randomUUID(),
      text: child.text,
      marks: child.marks,
    });
  }

  const allowedStyles = ["normal", "h2", "h3", "blockquote"];
  const style = block.style === undefined ? "normal" : block.style;
  if (typeof style !== "string" || !allowedStyles.includes(style)) return null;
  let listItem: string | undefined;
  if (block.listItem !== undefined) {
    if (block.listItem !== "bullet" && block.listItem !== "number") return null;
    listItem = block.listItem;
  }

  const markDefs: Record<string, unknown>[] = [];
  if (block.markDefs !== undefined) {
    if (!Array.isArray(block.markDefs) || block.markDefs.length > 50) return null;
    for (const definition of block.markDefs) {
      if (!isRecord(definition) || definition._type !== "link" || !validKey(definition._key) || !text(definition.href, 1, 2048)) return null;
      try {
        const url = new URL(definition.href);
        if (!["http:", "https:", "mailto:", "tel:"].includes(url.protocol)) return null;
      } catch {
        return null;
      }
      markDefs.push({ _type: "link", _key: definition._key, href: definition.href });
    }
  }

  return {
    _type: "block",
    _key: validKey(block._key) ? block._key : crypto.randomUUID(),
    style,
    ...(listItem ? { listItem } : {}),
    children,
    markDefs,
  };
}

function normalizeBody(value: unknown) {
  if (!Array.isArray(value) || value.length < 1 || value.length > 250) return null;
  const blocks: Record<string, unknown>[] = [];
  for (const item of value) {
    if (!isRecord(item)) return null;
    if (item._type === "block") {
      const block = normalizeTextBlock(item);
      if (!block) return null;
      blocks.push(block);
      continue;
    }
    if (
      item._type !== "image" ||
      !isRecord(item.asset) ||
      typeof item.asset._ref !== "string" ||
      !assetIdPattern.test(item.asset._ref) ||
      !text(item.alt, 1, 160)
    ) return null;
    blocks.push({
      _type: "image",
      _key: validKey(item._key) ? item._key : crypto.randomUUID(),
      asset: { _type: "reference", _ref: item.asset._ref },
      alt: item.alt.trim(),
    });
  }
  const hasText = blocks.some((block) =>
    Array.isArray(block.children) &&
    block.children.some((child) => isRecord(child) && typeof child.text === "string" && child.text.trim().length > 0),
  );
  return hasText ? blocks : null;
}

export function validateArticleDraft(value: unknown): ArticleDraftInput | null {
  if (!isRecord(value)) return null;
  const id = value.id;
  if (id !== undefined && (typeof id !== "string" || !/^[a-zA-Z0-9._-]{1,120}$/.test(id.replace(/^drafts\./, "")))) {
    return null;
  }
  const image = value.featuredImage;
  if (!isRecord(image) || !text(image.alt, 1, 160) || typeof image.assetId !== "string" || !assetIdPattern.test(image.assetId)) {
    return null;
  }
  if (
    !text(value.title, 5, 120) ||
    typeof value.slug !== "string" ||
    value.slug.length > 96 ||
    !slugPattern.test(value.slug) ||
    !text(value.excerpt, 30, 240) ||
    !text(value.authorId, 1, 128) ||
    !/^[a-zA-Z0-9._-]+$/.test(value.authorId) ||
    !text(value.categoryId, 1, 128) ||
    !/^[a-zA-Z0-9._-]+$/.test(value.categoryId) ||
    !text(value.seoTitle, 0, 60) ||
    !text(value.seoDescription, 0, 160) ||
    !Array.isArray(value.tags) ||
    value.tags.length > 10 ||
    !value.tags.every((tag) => text(tag, 1, 40)) ||
    new Set(value.tags.map((tag) => (tag as string).trim().toLowerCase())).size !== value.tags.length
  ) return null;

  const body = normalizeBody(value.body);
  if (!body) return null;
  return {
    ...(typeof id === "string" ? { id: id.replace(/^drafts\./, "") } : {}),
    title: value.title.trim(),
    slug: value.slug,
    excerpt: value.excerpt.trim(),
    featuredImage: { assetId: image.assetId, alt: image.alt.trim() },
    body,
    authorId: value.authorId,
    categoryId: value.categoryId,
    tags: value.tags.map((tag) => (tag as string).trim()),
    seoTitle: typeof value.seoTitle === "string" ? value.seoTitle.trim() : "",
    seoDescription: typeof value.seoDescription === "string" ? value.seoDescription.trim() : "",
  };
}
