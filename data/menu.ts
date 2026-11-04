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
    description: "Signature dishes, cakes and desserts prepared fresh to order.",
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
    description: "Soft drinks, juices, local refreshers, tea, coffee and energy drinks.",
    categories: [
      { id: "beverages", label: "Soft Drinks & Water" },
      { id: "beverage-refreshments", label: "Juices & Refreshments" },
      { id: "beverage-tea-coffee", label: "Tea & Coffee" },
      { id: "beverage-energy", label: "Energy Drinks" },
    ],
  },
  mixology: {
    slug: "mixology",
    title: "Bar & Mixology",
    description: "",
    categories: [
      { id: "mixology-cocktails", label: "Cocktails" },
      { id: "mixology-mocktails", label: "Mocktails" },
      { id: "mixology-beer-cider", label: "Beer & Cider" },
      { id: "mixology-wine", label: "Wine & Champagne" },
      { id: "mixology-spirits", label: "Spirits & Shots" },
    ],
    notice: "Alcoholic drinks are for guests aged 18 and over. Please drink responsibly.",
  },
};

export const menuItems: MenuItem[] = [
  // Appetizer
  { id: "prawn-crackers", name: "Prawn Crackers With Sweet Chilli Sauce", description: "", price: 4000, section: "food", category: "appetizer", image: "/images/menu/prawn-cracker.jpg", orderable: true },
  { id: "club-sandwich", name: "Club sandwich & fries", description: "", price: 10000, section: "food", category: "appetizer", image: "/images/menu/club-sandwich.jpg", orderable: true },
  { id: "pancakes", name: "Fluffy pancakes with sausages or fried chicken", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/pancakes.jpg", orderable: true },
  { id: "tacos", name: "Beef/Chicken Tacos", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/beef-tacos.jpg", orderable: true },
  { id: "shrimp-cocktail", name: "Shrimp Cocktail", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/shrimp-cocktail.webp", orderable: true },
  { id: "buffalo-wings", name: "Buffalo Chicken Wings", description: "", price: 15000, section: "food", category: "appetizer", image: "/images/menu/buffalo-wings.jpg", orderable: true },
  { id: "king-prawns", name: "King prawns", description: "", price: 30000, section: "food", category: "appetizer", image: "/images/menu/king-prawns.jpg", orderable: true },
  { id: "onion-rings", name: "Deep Fried Onion Rings", description: "", price: 3000, section: "food", category: "appetizer", image: "/images/menu/onion-rings.jpg", orderable: true },
  { id: "peppered-snail", name: "Peppered Snail", description: "", price: 25000, section: "food", category: "appetizer", image: "/images/menu/peppered-snail.jpeg", orderable: true },
  { id: "peppered-goat", name: "Peppered Goat Meat", description: "", price: 5000, section: "food", category: "appetizer", image: "/images/menu/peppered-meat.jpg", orderable: true },
  { id: "peppered-gizzard", name: "Peppered Gizzard", description: "", price: 5000, section: "food", category: "appetizer", image: "/images/menu/peppered-gizzard.jpg", orderable: true },

  // Sides
  { id: "mashed-potato-irish", name: "Mashed Potato Irish", description: "", price: 6000, section: "food", category: "sides", image: "/images/menu/mashed-potato.jpg", orderable: true },
  { id: "mashed-sweet-potato", name: "Mashed Sweet Potato", description: "", price: 5000, section: "food", category: "sides", image: "/images/menu/sweet-potato.jpg", orderable: true },
  { id: "yam-fries", name: "Yam Fries", description: "", price: 3500, section: "food", category: "sides", image: "/images/menu/yam-fries.jpg", orderable: true },
  { id: "plantain", name: "Plantain", description: "", price: 3500, section: "food", category: "sides", image: "/images/menu/fried-plantain.jpg", orderable: true },
  { id: "sweet-potato-fries", name: "Sweet Potato Fries", description: "", price: 3000, section: "food", category: "sides", image: "/images/menu/sweet-fried-potato.jpg", orderable: true },
  { id: "irish-potato-fries", name: "Irish Potato Fries", description: "", price: 4000, section: "food", category: "sides", image: "/images/menu/irish-potato-fries.jpg", orderable: true },
  { id: "dodo-gizzard", name: "Dodo Gizzard", description: "", price: 10000, section: "food", category: "sides", image: "/images/menu/dodo-gizzard.jpg", orderable: true },
  { id: "extra-rice", name: "Extra Rice", description: "", price: 3500, section: "food", category: "sides", image: "/images/menu/white-rice.jpg", orderable: true },
  { id: "barbecue-chicken-big", name: "Big Barbecue Chicken", description: "", price: 6000, section: "food", category: "sides", image: "/images/menu/big-chicken.jpg", orderable: true },
  { id: "peppered-chicken", name: "Peppered Chicken", description: "", price: 6000, section: "food", category: "sides", image: "/images/menu/peppered-chicken.jpg", orderable: true },

  // Salad Dishes
  { id: "caesar-chicked-salad", name: "Caesar Chicken Salad", description: "", price: 8000, section: "food", category: "salad-dishes", image: "/images/menu/caesar-chicken-salad.jpg", orderable: true },
  { id: "coleslaw", name: "Coleslaw", description: "", price: 3000, section: "food", category: "salad-dishes", image: "/images/menu/coleslaw.jpg", orderable: true },
  { id: "shrimps-salad", name: "Shrimps Salad", description: "", price: 15000, section: "food", category: "salad-dishes", image: "/images/menu/shrimps-salad.jpg", orderable: true },
  { id: "egg-mayo-salad", name: "Egg Mayo Salad", description: "", price: 8000, section: "food", category: "salad-dishes", image: "/images/menu/mayo-salad.jpg", orderable: true },

  // Platter
  { id: "mini-platter", name: "Mini Platter", description: "", price: 15000, section: "food", category: "platter", image: "", orderable: true },
  { id: "gourmet-special", name: "Gourmet Special", description: "", price: 25000, section: "food", category: "platter", image: "", orderable: true },
  { id: "exotic-platter", name: "Exotic Platter", description: "", price: 30000, section: "food", category: "platter", image: "", orderable: true },
  { id: "assorted-starters", name: "Assorted Starters", description: "", price: 50000, section: "food", category: "platter", image: "", orderable: true },

  // Lolar shon [ls] specials
  { id: "ls-pasta-special", name: "Ls Pasta Special", description: "mixture of macaroni and spaghetti with vegetables, goat meat & tomato chili sauce", price: 15000, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "gourmet-special", name: "Gourmet Special", description: "crispy chicken with green salad served with rice and pepper sauce", price: 20000, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "ls-chilli-goat-meat-rice", name: "Ls chilli goat meat rice", description: "diced chili goat meat, stir fried basmati rice with vegetables & eggs", price: 15000, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "irish-vegetables-potatoe-turkey-curry", name: "Irish Vegetables Potatoe in Turkey Curry Sauce", description: "Irish potatoe boiled with vegetables and turkey in curry sauce", price: 15000, section: "food", category: "ls-specials", image: "", orderable: true },
   
  // Pastas / noodles Dishes
  { id: "Creamy Penne Pasta", name: "Creamy Penne Pasta", description: "", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/creamy-pasta.jpg", orderable: true },
  { id: "Indomie Fiesta", name: "Indomie Fiesta", description: "", price: 8000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/indomie-fiesta.jpg", orderable: true },
  { id: "Shrimp Alfredo Pasta", name: "Shrimp Alfredo Pasta", description: "", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/Shrimp-pasta.jpg", orderable: true },
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
  { id: "barbecue-chicken", name: "Barbecue Chicken", description: "", price: 5000, section: "food", category: "grills", image: "/images/menu/grilled-chicken.jpg", orderable: true },
  { id: "grilled-catfish", name: "Grilled Catfish", description: "", price: 10000, section: "food", category: "grills", image: "/images/menu/grilled-catfish.jpg", orderable: true },
  { id: "grilled-croaker", name: "Grilled Croaker", description: "", price: 15000, section: "food", category: "grills", image: "/images/menu/croaker-fish.jpg", orderable: true },
{ id: "barbecue-turkey", name: "Barbecue Turkey", description: "", price: 8000, section: "food", category: "grills", image: "/images/menu/barbecue-turkey.jpg", orderable: true },



  // Africana
  { id: "nkwobi", name: "Nkwobi (Cowleg)", description: "", price: 7000, section: "food", category: "africana", image: "/images/menu/nkwobi.jpg", orderable: true },
  { id: "isiewu", name: "Isiewu (Goat Head)", description: "", price: 15000, section: "food", category: "africana", image: "/images/menu/isiewu.webp", orderable: true },
  { id: "seafood okro", name: "Seafood Okro", description: "", price: 20000, section: "food", category: "africana", image: "/images/menu/seafood-okro.jpg", orderable: true },
  { id: "egusi with vegetable soup", name: "Egusi with Vegetable Soup", description: "", price: 20000, section: "food", category: "africana", image: "/images/menu/egusi.jpg", orderable: true },
  { id: "assorted goat meat pepper soup", name: "Assorted Goat Meat Pepper Soup", description: "", price: 5000, section: "food", category: "africana", image: "/images/menu/goat-meat-pepper-soup.jpg", orderable: true },
  { id: "peppered goat meat", name: "Peppered Goat Meat", description: "", price: 4000, section: "food", category: "africana", image: "/images/menu/peppered-goat-meat.jpg", orderable: true },
  { id: "cowleg pepper soup", name: "Cowleg Pepper Soup", description: "", price: 10000, section: "food", category: "africana", image: "/images/menu/cow-leg-pepper-soup.jpg", orderable: true },
  { id: "goat meat pepper soup", name: "Goat Meat Pepper Soup", description: "", price: 8000, section: "food", category: "africana", image: "/images/menu/goat.jpg", orderable: true },
   { id: "Take away", name: "Take Away", description: "", price: 1000, section: "food", category: "africana", image: "/images/menu/take-away.jpg", orderable: true },
    { id: "oha soup with swallow", name: "Oha Soup With Swallow", description: "", price: 20000, section: "food", category: "africana", image: "/images/menu/oha-soup.jpg", orderable: true },
     { id: "croacker fish pepper soup", name: "Croacker Fish Pepper Soup", description: "", price: 17000, section: "food", category: "africana", image: "/images/menu/croaker-pepper-soup.jpg", orderable: true },
      { id: "catfish pepper soup", name: "Catfish Pepper Soup", description: "", price: 15000, section: "food", category: "africana", image: "/images/menu/cat-fish-pepper-soup.jpg", orderable: true },
  

  // Desserts
  { id: "chocolate, vanilla, strawberry cupcake", name: "Cupcake", description: "", price: 4000, section: "food", category: "desserts", image: "/images/menu/cupcakes.jpg", orderable: true },
  { id: "cake parfait", name: "Cake Parfait", description: "", price: 6000, section: "food", category: "desserts", image: "/images/menu/cake-parfait.webp", orderable: true },
  { id: "fruit parfait", name: "Fruit Parfait (Greek Yogurt)", description: "", price: 6000, section: "food", category: "desserts", image: "/images/menu/fruit.webp", orderable: true },


  // Beverages
 { id: "zobo", name: "Chilled Zobo", description: "", price: 2000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/zobo.png", orderable: true },
  { id: "coke", name: "Coke", description: "", price: 700, section: "beverages", category: "beverages", image: "/images/menu/coke.cutout.png", orderable: true },
  { id: "fanta", name: "Fanta", description: "", price: 700, section: "beverages", category: "beverages", image: "/images/menu/fanta.cutout.png", orderable: true },
  { id: "sprite", name: "Sprite", description: "", price: 700, section: "beverages", category: "beverages", image: "/images/menu/sprite.cutout.png", orderable: true },
  { id: "pepsi", name: "Pepsi", description: "", price: 700, section: "beverages", category: "beverages", image: "/images/menu/pepsi.webp", orderable: true },
  { id: "big hollandia yogort", name: "Big Hollandia Yogurt", description: "", price: 3000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/big-hollanidia-yogurt.cutout.png", orderable: true },
 { id: "big chivita juice", name: "Big Chivita Juice", description: "", price: 3000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/big-chivita-juice.cutout.png", orderable: true },
 { id: "small chivita juice", name: "Small Chivita Juice", description: "", price: 1500, section: "beverages", category: "beverage-refreshments", image: "/images/menu/small-chivita.cutout.png", orderable: true },
 { id: "mixed fruit or cranberry jug", name: "Mixed Fruit or Cranberry Jug", description: "", price: 10000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/crans.cutout.png", orderable: true },
 { id: "small 5alive pulpy", name: "Small 5alive Pulpy", description: "", price: 1500, section: "beverages", category: "beverage-refreshments", image: "/images/menu/small-pulpy.cutout.png", orderable: true },
 { id: "Schwepps", name: "House Iced Tea", description: "", price: 1500, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/Iced-Tea.jpg", orderable: true },
 { id: "maltina", name: "Maltina", description: "", price: 1200, section: "beverages", category: "beverages", image: "/images/menu/maltina.cutout.png", orderable: true },
 { id: "water", name: "Water", description: "", price: 500, section: "beverages", category: "beverages", image: "/images/menu/water.cutout.png", orderable: true },
// Tea
 { id: "apple-cinnamon-tea", name: "Apple Cinnamon Tea", description: "", price: 5000, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/apple-tea.jpeg", orderable: true },
 { id: "lemon-ginger-tea", name: "Lemon & Ginger Tea", description: "", price: 5000, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/lemon-tea.jpg", orderable: true },
 // Coffee
 { id: "coffee", name: "Coffee", description: "", price: 6000, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/coffee.jpg", orderable: true },

  // Soft Drinks
  // { id: "coke", name: "Coke", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "fanta", name: "Fanta", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "sprite", name: "Sprite", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "pepsi", name: "Pepsi", description: "Quality Drinks Served Chilled", price: 700, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "maltina", name: "Maltina", description: "Quality Drinks Served Chilled", price: 1200, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "yogurt-big", name: "Yogurt big", description: "Quality Drinks Served Chilled", price: 3000, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "juice-big", name: "Juice big", description: "Quality Drinks Served Chilled", price: 3000, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "juice-small", name: "Juice small", description: "Quality Drinks Served Chilled", price: 1500, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "mixed-fruit-or-cranberry-jug", name: "Mixed fruit or Cranberry jug", description: "Quality Drinks Served Chilled", price: 10000, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "water", name: "Water", description: "Quality Drinks Served Chilled", price: 500, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "5-alive-pulpy", name: "5 alive (pulpy/berry blast) small", description: "Quality Drinks Served Chilled", price: 1500, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "schweppes", name: "Schweppes", description: "Quality Drinks Served Chilled", price: 1500, section: "beverages", category: "beverages", image: "", orderable: true },
  // { id: "juicy-zobo", name: "Juicy Zobo", description: "", price: 1000, section: "beverages", category: "beverages", image: "", orderable: true },

  // Energy Drink
  { id: "bullet", name: "Bullet", description: "", price: 2000, section: "beverages", category: "beverage-energy", image: "/images/menu/bullet-energy-drink.cutout.png", orderable: true },
  { id: "red-bull", name: "Red Bull", description: "", price: 2000, section: "beverages", category: "beverage-energy", image: "/images/menu/red-bull.cutout.png", orderable: true },
  { id: "power-horse", name: "Power Horse", description: "", price: 2000, section: "beverages", category: "beverage-energy", image: "/images/menu/powerhorse.cutout.png", orderable: true },

  // Mixology (Cocktails & Mocktails)
  { id: "hibiscus-spritz", name: "Hibiscus Spritz", description: "", price: 4500, section: "mixology", category: "mixology-cocktails", image: "/images/menu/hibiscus-fritz.jpg", orderable: true },
  { id: "mango-mule", name: "Mango Mule", description: "", price: 5500, section: "mixology", category: "mixology-cocktails", image: "/images/menu/mango-mule.jpg", orderable: true },
  { id: "lagos-sunset", name: "Lagos Sunset", description: "", price: 6000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/lagos-sunset.jpg", orderable: true },
  { id: "spiced-old-fashioned", name: "Spiced Old Fashioned", description: "", price: 6500, section: "mixology", category: "mixology-cocktails", image: "/images/menu/old-spiced.webp", orderable: true },
  // Cocktails
  { id: "gourmet-firing-squad", name: "Gourmet Firing Squad", description: "", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/gourmet-firing-squad.jpg", orderable: true },
  { id: "baby-blue-bond", name: "Baby Blue Bond", description: "", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/blue-cocktail.jpg", orderable: true },
  { id: "tequila-sunrise", name: "Tequila Sunrise", description: "", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/tequila-sunrise.jpg", orderable: true },
  { id: "pina-colada", name: "Pina Colada", description: "", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/pina-colada.webp", orderable: true },
  { id: "margarita", name: "Margarita", description: "", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/magarita.webp", orderable: true },
  { id: "mojito", name: "Mojito", description: "", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/mojito.jpg", orderable: true },
  { id: "espresso-martini", name: "Espresso Martini", description: "", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/espresso.jpg", orderable: true },
  { id: "sex-on-the-beach", name: "Sex On The Beach", description: "", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/sex-beach.jpg", orderable: true },
  { id: "long-island-iced-tea", name: "Long Island Iced Tea", description: "", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/long-island.jpg", orderable: true },
  { id: "ice-americano", name: "Ice Americano", description: "", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/iced-americano.jpg", orderable: true },
  // Mocktails
  { id: "mojito-mocktail", name: "Mojito Mocktail", description: "", price: 8000, section: "mixology", category: "mixology-mocktails", image: "/images/menu/mojito-mocktail.jpg", orderable: true },
  { id: "baby-blue-calm-bond", name: "Baby Blue Calm Bond", description: "", price: 8000, section: "mixology", category: "mixology-mocktails", image: "/images/menu/baby-calm.jpg", orderable: true },
  { id: "gourmet-cool-squad", name: "Gourmet Cool Squad", description: "", price: 8000, section: "mixology", category: "mixology-mocktails", image: "/images/menu/gourmet-cool-squad.jpg", orderable: true },
  // Beers
  { id: "action-bitters", name: "Action Bitters", description: "", price: 1500, section: "mixology", category: "mixology-spirits", image: "/images/menu/action-bitters.cutout.png", orderable: true },
  { id: "origin-bitters-pet", name: "Orijin Bitters Pet", description: "", price: 1500, section: "mixology", category: "mixology-spirits", image: "/images/menu/orijin-bitters.cutout.png", orderable: true },
  { id: "guinness-big", name: "Guinness (Big)", description: "", price: 2500, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/guiness-big.cutout.png", orderable: true },
  { id: "guinness-small", name: "Guinness (Small)", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/guiness-small.cutout.png", orderable: true },
  { id: "legend", name: "Legend", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/legend-beer.cutout.png", orderable: true },
  { id: "large-origin", name: "Large Origin", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/orijin-sweet.cutout.png", orderable: true },
  { id: "heineken", name: "Heineken", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/heineken.cutout.png", orderable: true },
  { id: "goldberg", name: "Goldberg", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/goldberg.cutout.png", orderable: true },
  { id: "castle-lite", name: "Castle lite", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/castle-lite.cutout.png", orderable: true },
  { id: "gulder", name: "Gulder", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/gulder.cutout.png", orderable: true },
  { id: "star", name: "Star", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/star-beer.cutout.png", orderable: true },
  { id: "trophy", name: "Trophy", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/trophy-beer.cutout.png", orderable: true },
  { id: "budweiser", name: "Budweiser", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/budweiser.cutout.png", orderable: true },
  { id: "smirnoff-ice", name: "Smirnoff Ice", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/smirnoff-ice-big.cutout.png", orderable: true },
  { id: "star-radler", name: "Star Radler", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/star-radler.cutout.png", orderable: true },
  { id: "kastic", name: "Kastic", description: "", price: 1200, section: "mixology", category: "mixology-beer-cider", image: "", orderable: true },
  { id: "palm-wine", name: "Palm Wine", description: "", price: 2500, section: "mixology", category: "mixology-spirits", image: "/images/menu/palm-wine.jpeg", orderable: true },
  { id: "desperado", name: "Desperado", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/desperado-beer.cutout.png", orderable: true },
  { id: "flying-fish", name: "Flying Fish", description: "", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/flying-fish.webp", orderable: true },
  // Red Wine
  { id: "four-cousins", name: "Four Cousins", description: "", price: 15000, section: "mixology", category: "mixology-wine", image: "/images/menu/four-cousins.cutout.png", orderable: true },
  { id: "carlo-rossi", name: "Carlo Rossi", description: "", price: 15000, section: "mixology", category: "mixology-wine", image: "/images/menu/carlo-rossi.cutout.png", orderable: true },
  { id: "de-clan", name: "Declan", description: "", price: 15000, section: "mixology", category: "mixology-wine", image: "/images/menu/declan.cutout.png", orderable: true },
  { id: "sweet-lips", name: "Sweet Lips", description: "", price: 20000, section: "mixology", category: "mixology-wine", image: "/images/menu/sweet-lips.cutout.png", orderable: true },
  { id: "maccellis", name: "Macnellis", description: "", price: 20000, section: "mixology", category: "mixology-wine", image: "/images/menu/macnellis.webp", orderable: true },
  // Whiskey
  { id: "american-honey", name: "American Honey", description: "", price: 35000, section: "mixology", category: "mixology-spirits", image: "/images/menu/american-honey.cutout.png", orderable: true },
  { id: "jameson-green", name: "Jameson (Green)", description: "", price: 40000, section: "mixology", category: "mixology-spirits", image: "/images/menu/jameson-green.cutout.png", orderable: true },
  { id: "jameson-black-barel", name: "Jameson (Black Barel)", description: "", price: 60000, section: "mixology", category: "mixology-spirits", image: "/images/menu/jameson-black.webp", orderable: true },
  { id: "glenfidich-15", name: "Glenfidich (15)", description: "", price: 120000, section: "mixology", category: "mixology-spirits", image: "/images/menu/glenfidich-15.cutout.png", orderable: true },
  { id: "glenfidich-12", name: "Glenfidich (12)", description: "", price: 80000, section: "mixology", category: "mixology-spirits", image: "/images/menu/glendfidich-12.cutout.png", orderable: true },
  { id: "jack-daniel", name: "Jack Daniel", description: "", price: 35000, section: "mixology", category: "mixology-spirits", image: "/images/menu/jack-daniels.cutout.png", orderable: true },
  { id: "johnny-walker-red-label", name: "Johnny Walker Red Label", description: "", price: 25000, section: "mixology", category: "mixology-spirits", image: "/images/menu/red-label.cutout.png", orderable: true },
  { id: "william-lawson-small", name: "William Lawson Small", description: "", price: 7000, section: "mixology", category: "mixology-spirits", image: "/images/menu/william-lawson-small.cutout.png", orderable: true },
  { id: "best-whiskey", name: "Best Whiskey", description: "", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/best-whiskey.cutout.png", orderable: true },
  { id: "glenfidich", name: "Glenfidich", description: "", price: 160000, section: "mixology", category: "mixology-spirits", image: "/images/menu/glendfidich-18.cutout.png", orderable: true },
  // { id: "glenfidich-160", name: "Glenfidich", description: "", price: 160000, section: "mixology", category: "mixology", image: "", orderable: true },
  // De Gin
  { id: "small-gordon", name: "Small Gordon", description: "", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/small-gordons.cutout.png", orderable: true },
  { id: "gordon-dry-gin", name: "Gordon Dry Gin", description: "", price: 12000, section: "mixology", category: "mixology-spirits", image: "/images/menu/gordons-big.cutout.png", orderable: true },
  { id: "bombay-sapphine", name: "Bombay Sapphine", description: "", price: 45000, section: "mixology", category: "mixology-spirits", image: "/images/menu/bombay-sapphine.cutout.png", orderable: true },
  // Vodka
  { id: "smirnoff", name: "Smirnoff", description: "", price: 12000, section: "mixology", category: "mixology-spirits", image: "/images/menu/smirnoff-vodkha.cutout.png", orderable: true },
  { id: "smirnoff-chocolate-small", name: "Smirnoff Chocolate Small", description: "", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/smirnoff-chocolate.cutout.png", orderable: true },
  { id: "flirt-vodka", name: "Flirt Vodka", description: "", price: 18000, section: "mixology", category: "mixology-spirits", image: "/images/menu/flirt-vodkha.cutout.png", orderable: true },
  // Champagne
  { id: "velve-rosee", name: "Velve Rosee", description: "", price: 25000, section: "mixology", category: "mixology-wine", image: "/images/menu/moet-chandon.cutout.png", orderable: true },
  { id: "moet-nectar-rose", name: "Moet Nectar Rose", description: "", price: 160000, section: "mixology", category: "mixology-wine", image: "/images/menu/moet-nectar.cutout.png", orderable: true },
  // Whiskey (Hennessy)
  { id: "henessy-vsop", name: "Hennessy VSOP", description: "", price: 150000, section: "mixology", category: "mixology-spirits", image: "/images/menu/hennessy-vsop.cutout.png", orderable: true },
  { id: "henessy-vs", name: "Hennessy VS", description: "", price: 100000, section: "mixology", category: "mixology-spirits", image: "/images/menu/henessy-vs.cutout.png", orderable: true },
  { id: "remmy-vsop", name: "Remmy VSOP", description: "", price: 130000, section: "mixology", category: "mixology-spirits", image: "/images/menu/remy-vsop.cutout.png", orderable: true },
  // Baileys
  { id: "baileys-big-original", name: "Baileys Big Original", description: "", price: 30000, section: "mixology", category: "mixology-spirits", image: "/images/menu/baileys-original.cutout.png", orderable: true },
  // Campari
  { id: "campari", name: "Campari", description: "", price: 28000, section: "mixology", category: "mixology-spirits", image: "/images/menu/campari.cutout.png", orderable: true },
  { id: "small-campari", name: "Small Campari", description: "", price: 9000, section: "mixology", category: "mixology-spirits", image: "/images/menu/campari-small.cutout.png", orderable: true },
  // Best cream
  { id: "best-cream", name: "Best Cream", description: "", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/best-cream.cutout.png", orderable: true },
  // Tequila
  { id: "omealca-blanco-blue", name: "Omelca Blanco (Blue)", description: "", price: 45000, section: "mixology", category: "mixology-spirits", image: "/images/menu/omelca-blue.webp", orderable: true },
  { id: "omealca-blanco-dark-chocolate", name: "Omelca Blanco (Dark Chocolate)", description: "", price: 50000, section: "mixology", category: "mixology-spirits", image: "/images/menu/omelca-black.cutout.png", orderable: true },
  { id: "shot-tequila", name: "Tequila Shot", description: "", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/tequila-shotS.jpg", orderable: true },
  { id: "shot-vodka", name: "Vodka Shot", description: "", price: 3000, section: "mixology", category: "mixology-spirits", image: "/images/menu/vodka-shots.jpg", orderable: true },
];

export const getItemsBySection = (section: MenuSection) => menuItems.filter((i) => i.section === section);
export const getFeaturedItems = () => menuItems.filter((i) => i.featured);