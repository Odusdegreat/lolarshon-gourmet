export type MenuSection = "food" | "beverages" | "mixology";

export type MenuCategoryId =
  | "signature-dishes"
  | "cakes-desserts"
  | "hampers"
  | "beverages"
  | "mixology";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** NGN. Illustrative until the client confirms real prices. */
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

export type GalleryCategory = "food" | "events" | "cakes" | "hampers";

export type GalleryEntry = {
  id: string;
  title: string;
  alt: string;
  category: GalleryCategory;
  image: string;
};

export type BlogBlock = { type: "h2" | "p"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  category: string;
  image: string;
  readingMinutes: number;
  body: BlogBlock[];
};
