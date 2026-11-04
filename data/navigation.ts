export type NavChild = { label: string; href: string; description: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/** Primary navigation as specified by the client. */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Menu",
    href: "/menu/food",
    children: [
      { label: "Food Menu", href: "/menu/food", description: "Small bites, platters, rice, grills, African dishes and desserts" },
      { label: "Beverages", href: "/menu/beverages", description: "Soft drinks, juices, zobo, tea, coffee and energy drinks" },
      { label: "Bar & Mixology", href: "/menu/mixology", description: "Cocktails, mocktails, beers, wines and spirits" },
    ],
  },
  { label: "Book a Reservation", href: "/reservations" },
  { label: "Gallery", href: "/gallery" },
  { label: "Food to Your Door", href: "/delivery" },
  { label: "Events", href: "/events" },
  { label: "Corporate Meals", href: "/corporate-meals" },
  { label: "Blog", href: "/blog" },
];

export const footerExplore: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/our-story" },
  { label: "Food Menu", href: "/menu/food" },
  { label: "Beverages", href: "/menu/beverages" },
  { label: "Bar & Mixology", href: "/menu/mixology" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
];

export const footerServices: { label: string; href: string }[] = [
  { label: "Book a Reservation", href: "/reservations" },
  { label: "Food to Your Door", href: "/delivery" },
  { label: "Events", href: "/events" },
  { label: "Corporate Meals", href: "/corporate-meals" },
  { label: "Contact", href: "/contact" },
];
