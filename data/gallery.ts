import type { GalleryCategory, GalleryEntry } from "@/types";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "events", label: "Events" },
  { id: "cakes", label: "Cakes" },
  { id: "hampers", label: "Hampers" },
];

/** Replace the images in /public/images/gallery with real photography. */
export const galleryEntries: GalleryEntry[] = [
  { id: "g1", title: "Jollof and grilled chicken", alt: "Plate of party jollof rice with grilled chicken and plantain", category: "food", image: "/images/gallery/food-1.jpg" },
  { id: "g2", title: "Peppered turkey", alt: "Peppered turkey served on a white platter", category: "food", image: "/images/gallery/food-2.jpg" },
  { id: "g3", title: "Seafood pasta", alt: "Creamy seafood pasta topped with prawns", category: "food", image: "/images/gallery/food-3.jpg" },
  { id: "g4", title: "Event buffet", alt: "Catered buffet table at an event", category: "events", image: "/images/gallery/events-1.jpg" },
  { id: "g5", title: "Private dinner", alt: "Elegantly set table for a private dinner", category: "events", image: "/images/gallery/events-2.jpg" },
  { id: "g6", title: "Red velvet cake", alt: "Red velvet celebration cake with cream cheese frosting", category: "cakes", image: "/images/gallery/cakes-1.jpg" },
  { id: "g7", title: "Chocolate drip cake", alt: "Chocolate drip cake decorated with fresh fruit", category: "cakes", image: "/images/gallery/cakes-2.jpg" },
  { id: "g8", title: "Dessert cups", alt: "Layered dessert cups arranged on a tray", category: "cakes", image: "/images/gallery/cakes-3.jpg" },
  { id: "g9", title: "Classic gourmet hamper", alt: "Gift hamper filled with baked treats and snacks", category: "hampers", image: "/images/gallery/hampers-1.jpg" },
  { id: "g10", title: "Celebration hamper", alt: "Large celebration hamper wrapped with ribbon", category: "hampers", image: "/images/gallery/hampers-2.jpg" },
  { id: "g11", title: "Canapé platter", alt: "Platter of assorted canapés for a reception", category: "events", image: "/images/gallery/events-3.jpg" },
  { id: "g12", title: "Asun platter", alt: "Smoky asun served with peppers and onions", category: "food", image: "/images/gallery/food-4.jpg" },
];
