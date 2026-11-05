import type { GalleryCategory, GalleryEntry } from "@/types";

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
  { id: "events", label: "Events" },
  { id: "videos", label: "Videos" },
];

/** Gallery photography and video clips, including supplied Lolarshons Gourmet media. */
export const galleryEntries: GalleryEntry[] = [
  { id: "g1", title: "Lolarshons Gourmet food", alt: "A Lolarshons Gourmet meal served with sides and sauce", category: "food", image: "/images/menu/lolarshon-food.jpg" },
  { id: "g2", title: "Lolarshons Gourmet drink", alt: "A colorful drink served at Lolarshons Gourmet", category: "drinks", image: "/images/menu/bish.JPG" },
  { id: "g4", title: "Hype at Lolarshons Gourmet", alt: "Hype video from a Lolarshons Gourmet event", category: "events", additionalCategories: ["videos"], image: "/images/gallery/video-hype.jpg", video: "/images/menu/hype.MP4" },
  { id: "g5", title: "Party at Lolarshons Gourmet", alt: "Party video from a Lolarshons Gourmet event", category: "events", additionalCategories: ["videos"], image: "/images/gallery/video-party.jpg", video: "/images/menu/party.mp4" },
  { id: "g13", title: "Lolarshons Gourmet drinks", alt: "Freshly prepared drinks served at Lolarshons Gourmet", category: "drinks", image: "/images/menu/lolarshon-drink.jpg" },
  { id: "g14", title: "Lolarshons Gourmet video 1", alt: "Video from Lolarshons Gourmet", category: "videos", image: "/images/gallery/video-lolar.jpg", video: "/images/menu/lolar.mov" },
  { id: "g15", title: "Lolarshons Gourmet video 2", alt: "Video from Lolarshons Gourmet", category: "videos", image: "/images/gallery/video-shon.jpg", video: "/images/menu/shon.mov" },
];
