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
      { id: "appetizer", label: "Appetizer" },
      { id: "sides", label: "Sides" },
      { id: "salad-dishes", label: "Salad Dishes" },
      { id: "platter", label: "Platter" },
      { id: "ls-specials", label: "Lolar shon [ls] specials" },
      { id: "pastas-noodles-dishes", label: "Pastas / noodles Dishes" },
      { id: "rice-meal", label: "Rice meal" },
      { id: "grills", label: "Grills" },
      { id: "africana", label: "Africana" },
      { id: "desserts", label: "Desserts" },
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
    title: "Bar & Mixology",
    description: "Bar & Mixology - Cocktails and mocktails for dinners, celebrations and events. Send us an enquiry and we will plan it with you.",
    categories: [{ id: "mixology", label: "Bar & Mixology" }],
    notice: "Alcoholic drinks are for guests aged 18 and over. Please drink responsibly.",
  },
};

export const menuItems: MenuItem[] = [
  // Appetizer
  { id: "prawn-crackers", name: "Prawn crackers with sweet chilli sauce", description: "", price: 4000, section: "food", category: "appetizer", image: "/images/menu/prawn-cracker.jpg", orderable: true },
  { id: "club-sandwich", name: "Club sandwich & fries", description: "", price: 10000, section: "food", category: "appetizer", image: "/images/menu/club-sandwich.jpg", orderable: true },
  { id: "pancakes", name: "Fluffy pancakes with sausages or fried chicken", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/pancakes.jpg", orderable: true },
  { id: "tacos", name: "Beef/chicken tacos", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/beef-tacos.jpg", orderable: true },
  { id: "shrimp-cocktail", name: "Shrimp cocktail", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/shrimp-cocktail.webp", orderable: true },
  { id: "buffalo-wings", name: "Buffalo chicken wings", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/buffalo-wings.jpg", orderable: true },
  { id: "king-prawns", name: "King prawns", description: "", price: 30000, section: "food", category: "appetizer", image: "/images/menu/king-prawns.jpg", orderable: true },
  { id: "onion-rings", name: "Deep fried onion rings", description: "", price: 3000, section: "food", category: "appetizer", image: "/images/menu/onion-rings.jpg", orderable: true },
  { id: "peppered-snail", name: "Peppered snail", description: "", price: 25000, section: "food", category: "appetizer", image: "/images/menu/peppered-snail.jpeg", orderable: true },
  { id: "peppered-goat", name: "Peppered goat meat", description: "", price: 5000, section: "food", category: "appetizer", image: "/images/menu/peppered-meat.jpg", orderable: true },
  { id: "peppered-gizzard", name: "Peppered gizzard", description: "", price: 5000, section: "food", category: "appetizer", image: "/images/menu/peppered-gizzard.jpg", orderable: true },

  // Sides
  { id: "mashed-potato-irish", name: "Mashed Potato Irish", description: "", price: 6000, section: "food", category: "sides", image: "/images/menu/mashed-potato.jpg", orderable: true },
  { id: "mashed-sweet-potato", name: "Mashed Sweet Potato", description: "", price: 5000, section: "food", category: "sides", image: "/images/menu/sweet-potato.jpg", orderable: true },
  { id: "yam-fries", name: "Yam Fries", description: "", price: 3500, section: "food", category: "sides", image: "/images/menu/yam-fries.jpg", orderable: true },
  { id: "plantain", name: "Plantain", description: "", price: 3500, section: "food", category: "sides", image: "/images/menu/fried-plantain.jpg", orderable: true },
  { id: "sweet-potato-fries", name: "Sweet Potato Fries", description: "", price: 3000, section: "food", category: "sides", image: "/images/menu/sweet-fried-potato.jpg", orderable: true },
  { id: "irish-potato-fries", name: "Irish Potato Fries", description: "", price: 4000, section: "food", category: "sides", image: "/images/menu/irish-potato-fries.jpg", orderable: true },
  { id: "dodo-gizzard", name: "Dodo Gizzard", description: "", price: 10000, section: "food", category: "sides", image: "/images/menu/dodo-gizzard.jpg", orderable: true },
  { id: "extra-rice", name: "Extra rice", description: "", price: 3500, section: "food", category: "sides", image: "/images/menu/white-rice.jpg", orderable: true },
  { id: "barbecue-chicken-big", name: "Barbecue chicken big", description: "", price: 6000, section: "food", category: "sides", image: "/images/menu/big-chicken.jpg", orderable: true },
  { id: "peppered-chicken", name: "Peppered chicken", description: "", price: 6000, section: "food", category: "sides", image: "/images/menu/peppered-chicken.jpg", orderable: true },

  // Salad Dishes
  { id: "caesar-chicked-salad", name: "Caesar chicked salad", description: "cabbage, chicken, carrot, lettuce, sweet corn, green peas", price: 8000, section: "food", category: "salad-dishes", image: "/images/menu/caesar-chicken-salad.jpg", orderable: true },
  { id: "coleslaw", name: "Coleslaw", description: "", price: 3000, section: "food", category: "salad-dishes", image: "/images/menu/coleslaw.jpg", orderable: true },
  { id: "shrimps-salad", name: "Shrimps salad", description: "Shrimps,cabbage, carrot, lettuce, green peas, sweet corn", price: 15000, section: "food", category: "salad-dishes", image: "/images/menu/shrimps-salad.jpg", orderable: true },
  { id: "egg-mayo-salad", name: "Egg mayo salad", description: "boiled egg, cabbage, carrot, lettuce, green peas, sweet corn", price: 8000, section: "food", category: "salad-dishes", image: "/images/menu/mayo-salad.jpg", orderable: true },

  // Platter
  { id: "mini-platter", name: "Mini platter", description: "", price: 15000, section: "food", category: "platter", image: "", orderable: true },
  { id: "gourmet-special", name: "Gourmet special", description: "", price: 25000, section: "food", category: "platter", image: "", orderable: true },
  { id: "exotic-platter", name: "Exotic platter", description: "", price: 30000, section: "food", category: "platter", image: "", orderable: true },
  { id: "assorted-starters", name: "Assorted starters", description: "", price: 50000, section: "food", category: "platter", image: "", orderable: true },

  // Lolar shon [ls] specials
  { id: "ls-special-1", name: "Lolar shon Special #1", description: "Chef's special dish of the day, ask your server for details.", price: 5500, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "ls-special-2", name: "Lolar shon Special #2", description: "Chef's special dish of the day, ask your server for details.", price: 6200, section: "food", category: "ls-specials", image: "", orderable: true },
   
  // Pastas / noodles Dishes
  { id: "Creamy Penne Pasta", name: "Creamy penne pasta", description: "", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/creamy-pasta.jpg", orderable: true },
  { id: "Indomie Fiesta", name: "Indomie Fiesta", description: "", price: 8000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/indomie-fiesta.jpg", orderable: true },
  { id: "Shrimp Alfredo Pasta", name: "Shrimp Alfredo Pasta", description: "", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/creamy-pasta.jpg", orderable: true },
  { id: "Singapore Noodles", name: "Singapore Noodles", description: "", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/singapore-noodles.jpg", orderable: true },
 { id: "Jollof Spaghetti", name: "Jollof Spaghetti", description: "", price: 15000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/jollof-spaghetti.jpg", orderable: true },
{ id: "Noodles & Eggs", name: "Noodles & Eggs", description: "", price: 4500, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/indomie-egg.webp", orderable: true },
  
// Rice meal
  { id: "ofada-rice", name: "Ofada Rice", description: "Aromatic ofada rice with traditional sauce.", price: 15000, section: "food", category: "rice-meal", image: "/images/menu/ofada-rice.jpg", orderable: true },
  { id: "jollof-rice", name: "Jollof Rice", description: "Party jollof rice with assorted proteins.", price: 15000, section: "food", category: "rice-meal", image: "/images/menu/jollof-rice.webp", orderable: true },
 { id: "native white rice", name: "Native White Rice", description: "Traditional Nigerian white rice, served with your choice of sauce.", price: 8000, section: "food", category: "rice-meal", image: "/images/menu/rice-stew.jpg", orderable: true },
   { id: "seafood mix", name: "Seafood Mix", description: "A delightful combination of fresh seafood with a savory sauce.", price: 25000, section: "food", category: "rice-meal", image: "/images/menu/seafood-fried-rice.jpg", orderable: true },
  { id: "fried rice extravaganza", name: "Fried Rice Extravaganza", description: "A delicious mix of fried rice with assorted proteins.", price: 35000, section: "food", category: "rice-meal", image: "/images/menu/extra-fried-rice.webp", orderable: true },
  { id: "fried rice with choices", name: "Fried Rice with Choices", description: "Choose your preferred proteins for a customized fried rice experience.", price: 20000, section: "food", category: "rice-meal", image: "/images/menu/fried-rice.jpg", orderable: true },
  { id: "mixed feelings experience", name: "Mixed Feelings Experience", description: "Party jollof rice with assorted proteins.", price: 30000, section: "food", category: "rice-meal", image: "/images/menu/jollof-rice.webp", orderable: true },
 // Grills
  { id: "grilled-chicken", name: "Grilled Chicken", description: "Herb-marinated grilled chicken, served with sides.", price: 5200, section: "food", category: "grills", image: "", orderable: true },
  { id: "grilled-turkey", name: "Grilled Turkey", description: "Spiced grilled turkey, a healthy main option.", price: 6800, section: "food", category: "grills", image: "", orderable: true },

  // Africana
  { id: "asaukwu", name: "Asaukwu", description: "Traditional African dish, prepared with authentic spices.", price: 7000, section: "food", category: "africana", image: "", orderable: true },
  { id: "fufu-soup", name: "Fufu with Soup", description: "Fufu pounded with assorted vegetable soup and proteins.", price: 8500, section: "food", category: "africana", image: "", orderable: true },

  // Desserts
  { id: "ice-cream", name: "Ice Cream", description: "Assorted flavors of premium ice cream.", price: 2500, section: "food", category: "desserts", image: "", orderable: true },
  { id: "fruit-platter", name: "Fruit Platter", description: "Fresh seasonal fruit platter.", price: 3000, section: "food", category: "desserts", image: "", orderable: true },

  // Beverages
  { id: "zobo", name: "Chilled Zobo", description: "Hibiscus drink infused with ginger and cloves, served cold.", price: 1800, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "chapman", name: "Chapman", description: "A Nigerian favourite: citrus, grenadine and a touch of bitters, non-alcoholic.", price: 2500, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "pineapple-ginger", name: "Pineapple & Ginger Juice", description: "Fresh-pressed pineapple with a warming ginger kick.", price: 2200, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "fruit-smoothie", name: "Fresh Fruit Smoothie", description: "Blended seasonal fruit, no added sugar unless requested.", price: 3000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "iced-tea", name: "House Iced Tea", description: "Lightly sweetened tea with citrus and mint.", price: 1800, section: "beverages", category: "beverages", image: "", orderable: true },

  // Tea
  { id: "apple-cinnamon-tea", name: "Apple cinnamon tea", description: "infused fruit & herb, served with honey", price: 5000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "lemon-ginger-tea", name: "Lemon & Ginger Tea", description: "Served with Honey", price: 5000, section: "beverages", category: "beverages", image: "", orderable: true },

  // Coffee
  { id: "coffee", name: "Coffee", description: "", price: 6000, section: "beverages", category: "beverages", image: "", orderable: true },

  // Soft Drinks
  { id: "coke", name: "Coke", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "fanta", name: "Fanta", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "sprite", name: "Sprite", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "pepsi", name: "Pepsi", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "maltina", name: "Maltina", description: "Quality Drinks Served Chilled", price: 1200, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "yogurt-big", name: "Yogurt big", description: "Quality Drinks Served Chilled", price: 3000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "juice-big", name: "Juice big", description: "Quality Drinks Served Chilled", price: 3000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "juice-small", name: "Juice small", description: "Quality Drinks Served Chilled", price: 1500, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "mixed-fruit-or-cranberry-jug", name: "Mixed fruit or Cranberry jug", description: "Quality Drinks Served Chilled", price: 10000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "water", name: "Water", description: "Quality Drinks Served Chilled", price: 500, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "5-alive-pulpy", name: "5 alive (pulpy/berry blast) small", description: "Quality Drinks Served Chilled", price: 1500, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "schweppes", name: "Schweppes", description: "Quality Drinks Served Chilled", price: 1500, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "juicy-zobo", name: "Juicy Zobo", description: "", price: 1000, section: "beverages", category: "beverages", image: "", orderable: true },

  // Energy Drink
  { id: "bullet", name: "Bullet", description: "Quality Drinks Served Chilled", price: 2000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "red-bull", name: "Red bull", description: "Quality Drinks Served Chilled", price: 2000, section: "beverages", category: "beverages", image: "", orderable: true },
  { id: "power-horse", name: "power horse", description: "Quality Drinks Served Chilled", price: 2000, section: "beverages", category: "beverages", image: "", orderable: true },

  // Mixology (Cocktails & Mocktails)
  { id: "hibiscus-spritz", name: "Hibiscus Spritz", description: "Hibiscus, citrus and sparkling water. Available as a mocktail.", price: 4500, section: "mixology", category: "mixology", image: "", orderable: false },
  { id: "mango-mule", name: "Mango Mule", description: "Mango, lime and ginger beer, served over crushed ice.", price: 5500, section: "mixology", category: "mixology", image: "", orderable: false },
  { id: "lagos-sunset", name: "Lagos Sunset", description: "A layered tropical cocktail with pineapple, passion fruit and grenadine.", price: 6000, section: "mixology", category: "mixology", image: "", orderable: false },
  { id: "spiced-old-fashioned", name: "Spiced Old Fashioned", description: "A classic with warming spice and an orange twist.", price: 6500, section: "mixology", category: "mixology", image: "", orderable: false },
  // Cocktails
  { id: "gourmet-firing-squad", name: "Gourmet firing squad", description: "tequila, gin, grenadine syrup, hibiscus juice, chapman, campari", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "baby-blue-bond", name: "Baby blue bond", description: "blue curacao, vodka, clear gin, citrus gin, lime cordial mojito & sprite", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "tequila-sunrise", name: "Tequila sunrise", description: "tequila, freshly squeezed orange juice, grenadine", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "pina-colada", name: "Pina colada", description: "pineapple juice, malibu, coconut cream", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "margarita", name: "Margarita", description: "tequila (50ml) fresh lime juice, triple sec", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "mojito", name: "Mojito", description: "rum, lime cordial, mojito, mint syrup, mint leaves, sweetener", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "espresso-martini", name: "Espresso martini", description: "vodka, coffee liqueur, espresso", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "sex-on-the-beach", name: "Sex on the beach", description: "vodka, peach, cranberry juice, orange juice", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "long-island-iced-tea", name: "Long island iced tea", description: "vodka, tequila, rum, gin, triple sec, coke", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "ice-americano", name: "Ice Americano", description: "Water, ice, espresso", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Mocktails
  { id: "mojito-mocktail", name: "Mojito mocktail", description: "lime cordial, mojito, mint syrup, sweetener", price: 8000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "baby-blue-calm-bond", name: "Baby blue calm bond", description: "blue curacao, lime cordial, mojito/sprite", price: 8000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "gourmet-cool-squad", name: "Gourmet cool squad", description: "grenadine syrup, hibiscus juice, chapman", price: 8000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Beers
  { id: "action-bitters", name: "Action Bitters", description: "Quality Drinks Served Chilled", price: 1500, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "origin-bitters-pet", name: "Origin Bitters pet", description: "Quality Drinks Served Chilled", price: 1500, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "guinness-big", name: "Guinness (big)", description: "Quality Drinks Served Chilled", price: 2500, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "guinness-small", name: "Guinness (Small)", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "legend", name: "legend", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "large-origin", name: "Large origin", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "heineken", name: "Heineken", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "goldberg", name: "Goldberg", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "castle-lite", name: "Castle lite", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "gulder", name: "Gulder", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "star", name: "Star", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "trophy", name: "Trophy", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "budweiser", name: "Budweiser", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "smirnoff-ice", name: "Smirnoff ice", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "star-radler", name: "Star radler", description: "Quality Drinks Served Chilled", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "kastic", name: "Kastic", description: "", price: 1200, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "palm-wine", name: "Palm wine", description: "Fresh and chilled", price: 2500, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "desperado", name: "Desperado", description: "Beer", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "flying-fish", name: "Flying fish", description: "Beer", price: 2000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Red Wine
  { id: "four-cousins", name: "Four Cousins", description: "Quality Drinks Served Chilled", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "carlo-rossi", name: "Carlo rossi", description: "Red/white/rose/mixed fruits, Quality Drinks Served Chilled", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "de-clan", name: "De clan", description: "Quality Drinks Served Chilled", price: 15000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "sweet-lips", name: "Sweet lips", description: "Quality Drinks Served Chilled", price: 20000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "maccellis", name: "Macnellis", description: "Quality Drinks Served Chilled", price: 20000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Whiskey
  { id: "american-honey", name: "American honey", description: "Quality Drinks Served Chilled", price: 35000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "jameson-green", name: "Jameson (green)", description: "Quality Drinks Served Chilled", price: 40000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "jameson-black-barel", name: "Jameson (black barel)", description: "Quality Drinks Served Chilled", price: 60000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "glenfidich-15", name: "Glenfidich (15)", description: "Quality Drinks Served Chilled", price: 120000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "glenfidich-12", name: "Glenfidich (12)", description: "Quality Drinks Served Chilled", price: 80000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "jack-daniel", name: "Jack daniel", description: "Quality Drinks Served Chilled", price: 35000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "johnny-walker-red-label", name: "Johnny walker red label", description: "Quality Drinks Served Chilled", price: 25000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "william-lawanson-small", name: "William Lawanson small", description: "", price: 7000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "best-whiskey", name: "Best whiskey", description: "", price: 4000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "glenfidich", name: "Glenfidich", description: "", price: 160000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "glenfidich-160", name: "Glenfidich", description: "", price: 160000, section: "mixology", category: "mixology", image: "", orderable: true },
  // De Gin
  { id: "small-gordon", name: "Small gordon", description: "Quality Drinks Served Chilled", price: 4000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "gordon-dry-gin", name: "Gordon dry gin", description: "Quality Drinks Served Chilled", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "bombay-sapphine", name: "Bombay sapphine", description: "Quality Drinks Served Chilled", price: 45000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Vodka
  { id: "smirnoff", name: "Smirnoff", description: "Quality Drinks Served Chilled", price: 12000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "smirnoff-chocolate-small", name: "Smirnoff chocolate small", description: "Quality Drinks Served Chilled", price: 4000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "flirt-vodka", name: "Flirt Vodka", description: "Quality Drinks Served Chilled", price: 18000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Champagne
  { id: "velve-rosee", name: "Velve Rosee", description: "Quality Drinks Served Chilled", price: 25000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "moet-nectar-rose", name: "Moet nectar rose", description: "", price: 160000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Whiskey (Hennessy)
  { id: "henessy-vsop", name: "Hennessy vsop", description: "Quality Drinks Served Chilled", price: 150000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "henessy-vs", name: "Hennessy vs", description: "Quality Drinks Served Chilled", price: 100000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "remmy-vsop", name: "Remmy vsop", description: "Quality Drinks Served Chilled Liqueur", price: 130000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Baileys
  { id: "baileys-big-original", name: "Baileys big original", description: "Quality Drinks Served Chilled", price: 30000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Campari
  { id: "campari", name: "Campari", description: "Quality Drinks Served Chilled", price: 28000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "small-campari", name: "Small campari", description: "Quality Drinks Served Chilled", price: 9000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Best cream
  { id: "best-cream", name: "Best cream", description: "", price: 4000, section: "mixology", category: "mixology", image: "", orderable: true },
  // Tequila
  { id: "omealca-blanco-blue", name: "Omelca blanco (blue)", description: "Quality Drinks Served Chilled", price: 45000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "omealca-blanco-dark-chocolate", name: "Omelca blanco (dark chocolate)", description: "Quality Drinks Served Chilled", price: 50000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "shot-tequila", name: "Shot tequila", description: "Quality Drinks Served Chilled", price: 4000, section: "mixology", category: "mixology", image: "", orderable: true },
  { id: "shot-vodka", name: "Shot vodka", description: "Quality Drinks Served Chilled", price: 3000, section: "mixology", category: "mixology", image: "", orderable: true },
];

export const getItemsBySection = (section: MenuSection) => menuItems.filter((i) => i.section === section);
export const getFeaturedItems = () => menuItems.filter((i) => i.featured);