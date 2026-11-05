export type MenuSection = "food" | "beverages" | "mixology";

export type MenuCategoryId =
  | "appetizer"
  | "sides"
  | "salad-dishes"
  | "platter"
  | "ls-specials"
  | "pastas-noodles-dishes"
  | "rice-meal"
  | "grills"
  | "africana"
  | "desserts"
  | "beverages"
  | "beverage-refreshments"
  | "beverage-tea-coffee"
  | "beverage-energy"
  | "mixology"
  | "mixology-cocktails"
  | "mixology-mocktails"
  | "mixology-beer-cider"
  | "mixology-wine"
  | "mixology-spirits";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Price in NGN. */
  price: number;
  section: MenuSection;
  category: MenuCategoryId;
  image: string;
  /** false = enquiry-only (shows "Enquire on WhatsApp" instead of add to cart). */
  orderable: boolean;
  featured?: boolean;
};

export type CartLine = { item: MenuItem; quantity: number };

export type Fulfilment = "pickup" | "delivery";

export type OrderDetails = {
  name: string;
  phone?: string;
  fulfilment: Fulfilment;
  address?: string;
  date?: string;
  time?: string;
  notes?: string;
};

export type GalleryCategory = "food" | "drinks" | "events" | "videos";

export type GalleryEntry = {
  id: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  additionalCategories?: GalleryCategory[];
  image: string;
  video?: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: string;
  categories: { _id: string; name: string; slug: string }[];
  tags: string[];
  image: string;
  author: { name: string; biography?: string; image: string | null } | null;
  seoTitle?: string;
  seoDescription?: string;
  openGraphImage: string | null;
  featured: boolean;
  readingMinutes: number;
  body: import("@portabletext/react").PortableTextBlock[];
};
