import type { MenuCategoryId, MenuItem, MenuSection } from "@/types";

/**
 * Mock menu data. PRICES ARE ILLUSTRATIVE (NGN) until the client supplies real ones.
 * Images are expected at the given paths; a branded placeholder shows when a file is missing.
 */
export const PRICES_ARE_ILLUSTRATIVE = true;

export type MenuSectionConfig = {
  slug: MenuSection;
  title: string;
  description: string;
  categories: { id: MenuCategoryId; label: string }[];
  notice?: string;
};

export const menuSections: Record<MenuSection, MenuSectionConfig> = {
  food: {
    slug: "food",
    title: "Food Menu",
    description: "Signature dishes, cakes and desserts, and gourmet hampers, prepared fresh to order.",
    categories: [
      { id: "signature-dishes", label: "Signature Dishes" },
      { id: "cakes-desserts", label: "Cakes & Desserts" },
      { id: "hampers", label: "Food Hampers" },
    ],
  },
  beverages: {
    slug: "beverages",
    title: "Beverages",
    description: "Freshly made juices and chilled drinks to go with your meal.",
    categories: [{ id: "beverages", label: "Beverages" }],
  },
  mixology: {
    slug: "mixology",
    title: "Mixology",
    description: "Cocktails and mocktails for dinners, celebrations and events. Send us an enquiry and we will plan it with you.",
    categories: [{ id: "mixology", label: "Cocktails & Mocktails" }],
    notice: "Alcoholic drinks are for guests aged 18 and over. Please drink responsibly.",
  },
};

export const menuItems: MenuItem[] = [
  // Signature dishes
  { id: "jollof-grilled-chicken", name: "Party Jollof with Grilled Chicken", description: "Smoky party-style jollof rice served with herb-marinated grilled chicken and fried plantain.", price: 6500, section: "food", category: "signature-dishes", image: "/images/menu/jollof-grilled-chicken.jpg", orderable: true, featured: true },
  { id: "ofada-rice-sauce", name: "Ofada Rice & Designer Sauce", description: "Aromatic ofada rice with a rich, slow-cooked pepper sauce and your choice of protein.", price: 7500, section: "food", category: "signature-dishes", image: "/images/menu/ofada-rice-sauce.jpg", orderable: true, featured: true },
  { id: "peppered-turkey", name: "Peppered Turkey", description: "Tender turkey in a spiced pepper glaze, served as a main or a sharing portion.", price: 8000, section: "food", category: "signature-dishes", image: "/images/menu/peppered-turkey.jpg", orderable: true },
  { id: "asun-platter", name: "Asun Platter", description: "Smoky, spicy grilled goat tossed with peppers and onions.", price: 7000, section: "food", category: "signature-dishes", image: "/images/menu/asun-platter.jpg", orderable: true },
  { id: "egusi-pounded-yam", name: "Egusi with Pounded Yam", description: "Classic melon-seed soup with assorted proteins, served with smooth pounded yam.", price: 9000, section: "food", category: "signature-dishes", image: "/images/menu/egusi-pounded-yam.jpg", orderable: true },
  { id: "seafood-pasta", name: "Creamy Seafood Pasta", description: "Al dente pasta with prawns and fish in a light garlic cream sauce.", price: 10500, section: "food", category: "signature-dishes", image: "/images/menu/seafood-pasta.jpg", orderable: true },

  // Cakes & desserts
  { id: "red-velvet-cake", name: "Red Velvet Celebration Cake", description: "Moist red velvet layers with cream-cheese frosting. Custom sizes and messages available.", price: 35000, section: "food", category: "cakes-desserts", image: "/images/menu/red-velvet-cake.jpg", orderable: true, featured: true },
  { id: "chocolate-drip-cake", name: "Chocolate Drip Cake", description: "Rich chocolate sponge with ganache drip and fresh finishing touches.", price: 38000, section: "food", category: "cakes-desserts", image: "/images/menu/chocolate-drip-cake.jpg", orderable: true },
  { id: "dessert-cups", name: "Dessert Cups (Box of 6)", description: "Layered mini desserts, perfect for parties and gifting. Flavours on request.", price: 9000, section: "food", category: "cakes-desserts", image: "/images/menu/dessert-cups.jpg", orderable: true },
  { id: "cupcake-box", name: "Signature Cupcake Box (12)", description: "Twelve hand-decorated cupcakes in assorted flavours.", price: 15000, section: "food", category: "cakes-desserts", image: "/images/menu/cupcake-box.jpg", orderable: true },

  // Hampers
  { id: "classic-hamper", name: "Classic Gourmet Hamper", description: "A curated gift box of baked treats, snacks and sweet bites, beautifully packaged.", price: 30000, section: "food", category: "hampers", image: "/images/menu/classic-hamper.jpg", orderable: true, featured: true },
  { id: "celebration-hamper", name: "Celebration Hamper", description: "A larger hamper for birthdays, weddings and corporate gifting. Contents can be personalised.", price: 55000, section: "food", category: "hampers", image: "/images/menu/celebration-hamper.jpg", orderable: true },

  // Beverages
  { id: "zobo", name: "Chilled Zobo", description: "Hibiscus drink infused with ginger and cloves, served cold.", price: 1800, section: "beverages", category: "beverages", image: "/images/menu/zobo.jpg", orderable: true },
  { id: "chapman", name: "Chapman", description: "A Nigerian favourite: citrus, grenadine and a touch of bitters, non-alcoholic.", price: 2500, section: "beverages", category: "beverages", image: "/images/menu/chapman.jpg", orderable: true },
  { id: "pineapple-ginger", name: "Pineapple & Ginger Juice", description: "Fresh-pressed pineapple with a warming ginger kick.", price: 2200, section: "beverages", category: "beverages", image: "/images/menu/pineapple-ginger.jpg", orderable: true },
  { id: "fruit-smoothie", name: "Fresh Fruit Smoothie", description: "Blended seasonal fruit, no added sugar unless requested.", price: 3000, section: "beverages", category: "beverages", image: "/images/menu/fruit-smoothie.jpg", orderable: true },
  { id: "iced-tea", name: "House Iced Tea", description: "Lightly sweetened tea with citrus and mint.", price: 1800, section: "beverages", category: "beverages", image: "/images/menu/iced-tea.jpg", orderable: true },

  // Mixology (enquiry-only by default; flip `orderable` to true to allow add to cart)
  { id: "hibiscus-spritz", name: "Hibiscus Spritz", description: "Hibiscus, citrus and sparkling water. Available as a mocktail.", price: 4500, section: "mixology", category: "mixology", image: "/images/menu/hibiscus-spritz.jpg", orderable: false },
  { id: "mango-mule", name: "Mango Mule", description: "Mango, lime and ginger beer, served over crushed ice.", price: 5500, section: "mixology", category: "mixology", image: "/images/menu/mango-mule.jpg", orderable: false },
  { id: "lagos-sunset", name: "Lagos Sunset", description: "A layered tropical cocktail with pineapple, passion fruit and grenadine.", price: 6000, section: "mixology", category: "mixology", image: "/images/menu/lagos-sunset.jpg", orderable: false },
  { id: "spiced-old-fashioned", name: "Spiced Old Fashioned", description: "A classic with warming spice and an orange twist.", price: 6500, section: "mixology", category: "mixology", image: "/images/menu/spiced-old-fashioned.jpg", orderable: false },
];

export const getItemsBySection = (section: MenuSection) => menuItems.filter((i) => i.section === section);
export const getFeaturedItems = () => menuItems.filter((i) => i.featured);
