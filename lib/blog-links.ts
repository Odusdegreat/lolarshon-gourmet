export function isSafeBlogHref(href: string): boolean {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  if (href.startsWith("#")) return true;

  try {
    const url = new URL(href);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function isExternalBlogHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function isSafeBlogImageSrc(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(src).protocol);
  } catch {
    return false;
  }
}
