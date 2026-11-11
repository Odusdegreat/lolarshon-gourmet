import type { MenuCategoryId, MenuItem, MenuSection } from "@/types";

/** Menu data and item prices in NGN. */

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
    description: "Signature dishes, desserts and cocktails prepared fresh to order.",
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
    description: "Cocktails, mocktails, beers, wines, and spirits for every occasion.",
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
  { id: "prawn-crackers", name: "Prawn Crackers With Sweet Chilli Sauce", description: "Crunchy prawn crackers served with sweet chilli sauce.", price: 4000, section: "food", category: "appetizer", image: "/images/menu/prawn-cracker.jpg", orderable: true },
  { id: "club-sandwich", name: "Club sandwich & fries", description: "A toasted club sandwich served with a side of fries.", price: 10000, section: "food", category: "appetizer", image: "/images/menu/club-sandwich.jpg", orderable: true },
  { id: "pancakes", name: "Fluffy pancakes with sausages or fried chicken", description: "Fluffy pancakes served with your choice of sausages or fried chicken.", price: 15000, section: "food", category: "appetizer", image: "/images/menu/pancakes.jpg", orderable: true },
  { id: "tacos", name: "Beef/Chicken Tacos", description: "Beef or chicken tucked into soft tortillas for a satisfying savoury bite.", price: 15000, section: "food", category: "appetizer", image: "/images/menu/beef-tacos.jpg", orderable: true },
  { id: "shrimp-cocktail", name: "Shrimp Cocktail", description: "Chilled shrimp served with classic cocktail sauce.", price: 15000, section: "food", category: "appetizer", image: "/images/menu/shrimp-cocktail.webp", orderable: true },
  { id: "buffalo-wings", name: "Buffalo Chicken Wings", description: "Chicken wings coated in a tangy Buffalo-style sauce.", price: 15000, section: "food", category: "appetizer", image: "/images/menu/buffalo-wings.jpg", orderable: true },
  { id: "king-prawns", name: "King prawns", description: "A generous serving of king prawns prepared as a seafood starter.", price: 30000, section: "food", category: "appetizer", image: "/images/menu/king-prawns.jpg", orderable: true },
  { id: "onion-rings", name: "Deep Fried Onion Rings", description: "Crisp onion rings, deep-fried until golden.", price: 3000, section: "food", category: "appetizer", image: "/images/menu/onion-rings.jpg", orderable: true },
  { id: "peppered-snail", name: "Peppered Snail", description: "Tender snail pieces tossed in a spicy pepper sauce.", price: 25000, section: "food", category: "appetizer", image: "/images/menu/peppered-snail.jpeg", orderable: true },
  { id: "peppered-goat", name: "Peppered Goat Meat", description: "Goat meat cooked with a bold, spicy pepper seasoning.", price: 5000, section: "food", category: "appetizer", image: "/images/menu/peppered-meat.jpg", orderable: true },
  { id: "peppered-gizzard", name: "Peppered Gizzard", description: "Gizzard pieces tossed in a savoury pepper sauce.", price: 5000, section: "food", category: "appetizer", image: "/images/menu/peppered-gizzard.jpg", orderable: true },

  // Sides
  { id: "mashed-potato-irish", name: "Mashed Potato Irish", description: "Smooth mashed Irish potatoes, prepared as a comforting side.", price: 6000, section: "food", category: "sides", image: "/images/menu/mashed-potato.jpg", orderable: true },
  { id: "mashed-sweet-potato", name: "Mashed Sweet Potato", description: "Soft, creamy mashed sweet potato with a naturally sweet finish.", price: 5000, section: "food", category: "sides", image: "/images/menu/sweet-potato.jpg", orderable: true },
  { id: "yam-fries", name: "Yam Fries", description: "Yam cut into fries and cooked until crisp on the outside and tender inside.", price: 3500, section: "food", category: "sides", image: "/images/menu/yam-fries.jpg", orderable: true },
  { id: "plantain", name: "Plantain", description: "A side of sweet, golden plantain.", price: 3500, section: "food", category: "sides", image: "/images/menu/fried-plantain.jpg", orderable: true },
  { id: "sweet-potato-fries", name: "Sweet Potato Fries", description: "Sweet potato fries with a crisp outside and tender centre.", price: 3000, section: "food", category: "sides", image: "/images/menu/sweet-fried-potato.jpg", orderable: true },
  { id: "irish-potato-fries", name: "Irish Potato Fries", description: "Irish potatoes cut into fries and cooked until golden.", price: 4000, section: "food", category: "sides", image: "/images/menu/irish-potato-fries.jpg", orderable: true },
  { id: "dodo-gizzard", name: "Dodo Gizzard", description: "A savoury combination of fried plantain and seasoned gizzard.", price: 10000, section: "food", category: "sides", image: "/images/menu/dodo-gizzard.jpg", orderable: true },
  { id: "extra-rice", name: "Extra Rice", description: "An extra portion of rice to accompany your meal.", price: 3500, section: "food", category: "sides", image: "/images/menu/white-rice.jpg", orderable: true },
  { id: "barbecue-chicken-big", name: "Big Barbecue Chicken", description: "A generous portion of chicken prepared with barbecue seasoning.", price: 6000, section: "food", category: "sides", image: "/images/menu/big-chicken.jpg", orderable: true },
  { id: "peppered-chicken", name: "Peppered Chicken", description: "Chicken seasoned with a lively pepper sauce.", price: 6000, section: "food", category: "sides", image: "/images/menu/peppered-chicken.jpg", orderable: true },

  // Salad Dishes
  { id: "caesar-chicked-salad", name: "Caesar Chicken Salad", description: "Chicken served with fresh salad greens and Caesar-style dressing.", price: 8000, section: "food", category: "salad-dishes", image: "/images/menu/caesar-chicken-salad.jpg", orderable: true },
  { id: "coleslaw", name: "Coleslaw", description: "A crisp, creamy side of shredded cabbage and carrot.", price: 3000, section: "food", category: "salad-dishes", image: "/images/menu/coleslaw.jpg", orderable: true },
  { id: "shrimps-salad", name: "Shrimps Salad", description: "Shrimp served with a fresh assortment of salad vegetables.", price: 15000, section: "food", category: "salad-dishes", image: "/images/menu/shrimps-salad.jpg", orderable: true },
  { id: "egg-mayo-salad", name: "Egg Mayo Salad", description: "Chopped egg mixed with creamy mayonnaise for a simple, savoury salad.", price: 8000, section: "food", category: "salad-dishes", image: "/images/menu/mayo-salad.jpg", orderable: true },

  // Platter
  { id: "mini-platter", name: "Mini Platter", description: "Yam chips, plantain, sausages, and goat meat, served with ketchup and pepper sauce.", price: 15000, section: "food", category: "platter", image: "", orderable: true },
  { id: "gourmet-special", name: "Gourmet Special", description: "Yam chips, plantain, sausages, prawns, and spring rolls, served with ketchup and pepper sauce.", price: 25000, section: "food", category: "platter", image: "", orderable: true },
  { id: "exotic-platter", name: "Exotic Platter", description: "Plantain, french fries, sausages, goat meat, crab, and prawns, served with ketchup and pepper sauce.", price: 30000, section: "food", category: "platter", image: "/images/menu/exotic-platter.jpg", orderable: true },
  { id: "assorted-starters", name: "Assorted Starters", description: "French fries, plantain, fried gizzard skewers, prawns, samosas, spring rolls, and chicken wings.", price: 50000, section: "food", category: "platter", image: "", orderable: true },

  // Lolar shon [ls] specials
  { id: "ls-pasta-special", name: "Ls Pasta Special", description: "Macaroni and spaghetti mixed with vegetables, goat meat, and tomato chilli sauce.", price: 15000, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "ls-gourmet-special", name: "Gourmet Special", description: "Crispy chicken served with green salad, rice, and pepper sauce.", price: 20000, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "ls-chilli-goat-meat-rice", name: "Ls chilli goat meat rice", description: "Diced chilli goat meat with stir-fried basmati rice, vegetables, and eggs.", price: 15000, section: "food", category: "ls-specials", image: "", orderable: true },
  { id: "irish-vegetables-potatoe-turkey-curry", name: "Irish Vegetables Potatoe in Turkey Curry Sauce", description: "Irish potatoes boiled with vegetables and turkey in a curry sauce.", price: 15000, section: "food", category: "ls-specials", image: "", orderable: true },
   
  // Pastas / noodles Dishes
  { id: "Creamy Penne Pasta", name: "Creamy Penne Pasta", description: "Penne pasta tossed in a smooth, creamy sauce.", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/creamy-pasta.jpg", orderable: true },
  { id: "Indomie Fiesta", name: "Indomie Fiesta", description: "A flavourful serving of Indomie noodles prepared Fiesta-style.", price: 8000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/indomie-fiesta.jpg", orderable: true },
  { id: "Shrimp Alfredo Pasta", name: "Shrimp Alfredo Pasta", description: "Pasta with shrimp in a rich, creamy Alfredo-style sauce.", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/Shrimp-pasta.jpg", orderable: true },
  { id: "Singapore Noodles", name: "Singapore Noodles", description: "Stir-fried noodles prepared Singapore-style.", price: 20000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/singapore-noodles.jpg", orderable: true },
 { id: "Jollof Spaghetti", name: "Jollof Spaghetti", description: "Spaghetti cooked in a savoury, tomato-based jollof sauce.", price: 15000, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/jollof-spaghetti.jpg", orderable: true },
{ id: "Noodles & Eggs", name: "Noodles & Eggs", description: "Seasoned noodles served with eggs for a quick, filling meal.", price: 4500, section: "food", category: "pastas-noodles-dishes", image: "/images/menu/indomie-egg.webp", orderable: true },
  
// Rice meal
  { id: "ofada-rice", name: "Ofada Rice", description: "Aromatic ofada rice with traditional sauce.", price: 15000, section: "food", category: "rice-meal", image: "/images/menu/ofada-rice.jpg", orderable: true },
  { id: "jollof-rice", name: "Jollof Rice", description: "Party jollof rice with assorted proteins.", price: 15000, section: "food", category: "rice-meal", image: "/images/menu/jollof-rice.webp", orderable: true },
 { id: "native white rice", name: "Native White Rice", description: "Traditional Nigerian white rice, served with your choice of sauce.", price: 8000, section: "food", category: "rice-meal", image: "/images/menu/rice-stew.jpg", orderable: true },
   { id: "seafood mix", name: "Seafood Mix", description: "A delightful combination of fresh seafood with a savory sauce.", price: 25000, section: "food", category: "rice-meal", image: "/images/menu/seafood-fried-rice.jpg", orderable: true },
  { id: "fried rice extravaganza", name: "Fried Rice Extravaganza", description: "A delicious mix of fried rice with assorted proteins.", price: 35000, section: "food", category: "rice-meal", image: "/images/menu/extra-fried-rice.webp", orderable: true },
  { id: "fried rice with choices", name: "Fried Rice with Choices", description: "Choose your preferred proteins for a customized fried rice experience.", price: 20000, section: "food", category: "rice-meal", image: "/images/menu/fried-rice.jpg", orderable: true },
  { id: "mixed feelings experience", name: "Mixed Feelings Experience", description: "Party jollof rice with assorted proteins.", price: 30000, section: "food", category: "rice-meal", image: "/images/menu/jollof-rice.webp", orderable: true },
 // Grills
  { id: "barbecue-chicken", name: "Barbecue Chicken", description: "Chicken prepared with barbecue seasoning and grilled for a smoky finish.", price: 5000, section: "food", category: "grills", image: "/images/menu/grilled-chicken.jpg", orderable: true },
  { id: "grilled-catfish", name: "Grilled Catfish", description: "Catfish grilled and served as a hearty seafood dish.", price: 10000, section: "food", category: "grills", image: "/images/menu/grilled-catfish.jpg", orderable: true },
  { id: "grilled-croaker", name: "Grilled Croaker", description: "Croaker fish grilled for a savoury, smoky finish.", price: 15000, section: "food", category: "grills", image: "/images/menu/croaker-fish.jpg", orderable: true },
{ id: "barbecue-turkey", name: "Barbecue Turkey", description: "Turkey prepared with barbecue seasoning and cooked until tender.", price: 8000, section: "food", category: "grills", image: "/images/menu/barbecue-turkey.jpg", orderable: true },



  // Africana
  { id: "nkwobi", name: "Nkwobi (Cowleg)", description: "Cow leg served in the rich, spicy sauce traditionally used for nkwobi.", price: 7000, section: "food", category: "africana", image: "/images/menu/nkwobi.jpg", orderable: true },
  { id: "isiewu", name: "Isiewu (Goat Head)", description: "Goat head prepared in a traditional, richly seasoned sauce.", price: 15000, section: "food", category: "africana", image: "/images/menu/isiewu.webp", orderable: true },
  { id: "seafood okro", name: "Seafood Okro", description: "Okra soup prepared with a selection of seafood.", price: 20000, section: "food", category: "africana", image: "/images/menu/seafood-okro.jpg", orderable: true },
  { id: "egusi with vegetable soup", name: "Egusi with Vegetable Soup", description: "Egusi cooked with vegetables in a hearty Nigerian soup.", price: 20000, section: "food", category: "africana", image: "/images/menu/egusi.jpg", orderable: true },
  { id: "assorted goat meat pepper soup", name: "Assorted Goat Meat Pepper Soup", description: "An assortment of goat meat served in a warming pepper soup broth.", price: 5000, section: "food", category: "africana", image: "/images/menu/goat-meat-pepper-soup.jpg", orderable: true },
  { id: "peppered goat meat", name: "Peppered Goat Meat", description: "Goat meat cooked with a bold, spicy pepper seasoning.", price: 4000, section: "food", category: "africana", image: "/images/menu/peppered-goat-meat.jpg", orderable: true },
  { id: "cowleg pepper soup", name: "Cowleg Pepper Soup", description: "Cow leg simmered in a warming, peppery soup.", price: 10000, section: "food", category: "africana", image: "/images/menu/cow-leg-pepper-soup.jpg", orderable: true },
  { id: "goat meat pepper soup", name: "Goat Meat Pepper Soup", description: "Goat meat simmered in a warming, peppery soup.", price: 8000, section: "food", category: "africana", image: "/images/menu/goat.jpg", orderable: true },
   { id: "Take away", name: "Take Away", description: "A freshly prepared meal packed to enjoy on the go.", price: 1000, section: "food", category: "africana", image: "/images/menu/take-away.jpg", orderable: true },
    { id: "oha soup with swallow", name: "Oha Soup With Swallow", description: "Traditional oha soup served with swallow.", price: 20000, section: "food", category: "africana", image: "/images/menu/oha-soup.jpg", orderable: true },
     { id: "croacker fish pepper soup", name: "Croacker Fish Pepper Soup", description: "Croaker fish simmered in a spicy pepper soup broth.", price: 17000, section: "food", category: "africana", image: "/images/menu/croaker-pepper-soup.jpg", orderable: true },
      { id: "catfish pepper soup", name: "Catfish Pepper Soup", description: "Catfish simmered in a warming, peppery broth.", price: 15000, section: "food", category: "africana", image: "/images/menu/cat-fish-pepper-soup.jpg", orderable: true },
  

  // Desserts
  { id: "chocolate, vanilla, strawberry cupcake", name: "Cupcake", description: "A cupcake available in chocolate, vanilla, or strawberry.", price: 4000, section: "food", category: "desserts", image: "/images/menu/cupcakes.jpg", orderable: true },
  { id: "cake parfait", name: "Cake Parfait", description: "Layers of cake and cream served as a chilled parfait.", price: 6000, section: "food", category: "desserts", image: "/images/menu/cake-parfait.webp", orderable: true },
  { id: "fruit parfait", name: "Fruit Parfait (Greek Yogurt)", description: "A chilled parfait layered with fruit and Greek yoghurt.", price: 6000, section: "food", category: "desserts", image: "/images/menu/fruit.webp", orderable: true },


  // Beverages
 { id: "zobo", name: "Chilled Zobo", description: "Chilled zobo, a refreshing drink made from hibiscus.", price: 2000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/zobo.webp", orderable: true },
  { id: "coke", name: "Coke", description: "A chilled Coca-Cola soft drink with its familiar cola flavour.", price: 700, section: "beverages", category: "beverages", image: "/images/menu/coke.cutout.png", orderable: true },
  { id: "fanta", name: "Fanta", description: "A chilled, fruity Fanta soft drink.", price: 700, section: "beverages", category: "beverages", image: "/images/menu/fanta.cutout.png", orderable: true },
  { id: "sprite", name: "Sprite", description: "A crisp, chilled lemon-lime soft drink.", price: 700, section: "beverages", category: "beverages", image: "/images/menu/sprite.cutout.png", orderable: true },
  { id: "pepsi", name: "Pepsi", description: "A chilled Pepsi cola soft drink.", price: 700, section: "beverages", category: "beverages", image: "/images/menu/pepsi.webp", orderable: true },
  { id: "big hollandia yogort", name: "Big Hollandia Yogurt", description: "A large serving of Hollandia yoghurt, best enjoyed chilled.", price: 3000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/big-hollanidia-yogurt.cutout.png", orderable: true },
 { id: "big chivita juice", name: "Big Chivita Juice", description: "A large serving of chilled Chivita fruit juice.", price: 3000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/big-chivita-juice.cutout.png", orderable: true },
 { id: "small chivita juice", name: "Small Chivita Juice", description: "A small serving of chilled Chivita fruit juice.", price: 1500, section: "beverages", category: "beverage-refreshments", image: "/images/menu/small-chivita.cutout.png", orderable: true },
 { id: "mixed fruit or cranberry jug", name: "Mixed Fruit or Cranberry Jug", description: "A sharing jug of mixed-fruit or cranberry refreshment.", price: 10000, section: "beverages", category: "beverage-refreshments", image: "/images/menu/crans.cutout.png", orderable: true },
 { id: "small 5alive pulpy", name: "Small 5alive Pulpy", description: "A small, chilled 5Alive Pulpy fruit drink.", price: 1500, section: "beverages", category: "beverage-refreshments", image: "/images/menu/small-pulpy.cutout.png", orderable: true },
 { id: "Schwepps", name: "House Iced Tea", description: "House-brewed iced tea served chilled.", price: 1500, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/Iced-Tea.jpg", orderable: true },
 { id: "maltina", name: "Maltina", description: "A chilled malt drink with a smooth, rich taste.", price: 1200, section: "beverages", category: "beverages", image: "/images/menu/maltina.cutout.png", orderable: true },
 { id: "water", name: "Water", description: "Bottled drinking water, served chilled or at room temperature.", price: 500, section: "beverages", category: "beverages", image: "/images/menu/water.cutout.png", orderable: true },
// Tea
 { id: "apple-cinnamon-tea", name: "Apple Cinnamon Tea", description: "A warming tea with fragrant apple and cinnamon notes.", price: 5000, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/apple-tea.jpeg", orderable: true },
 { id: "lemon-ginger-tea", name: "Lemon & Ginger Tea", description: "A soothing tea with bright lemon and warming ginger.", price: 5000, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/lemon-tea.jpg", orderable: true },
 // Coffee
 { id: "coffee", name: "Coffee", description: "A freshly prepared cup of coffee.", price: 6000, section: "beverages", category: "beverage-tea-coffee", image: "/images/menu/coffee.jpg", orderable: true },

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
  { id: "bullet", name: "Bullet", description: "A chilled Bullet energy drink.", price: 2000, section: "beverages", category: "beverage-energy", image: "/images/menu/bullet-energy-drink.cutout.png", orderable: true },
  { id: "red-bull", name: "Red Bull", description: "A chilled Red Bull energy drink.", price: 2000, section: "beverages", category: "beverage-energy", image: "/images/menu/red-bull.cutout.png", orderable: true },
  { id: "power-horse", name: "Power Horse", description: "A chilled Power Horse energy drink.", price: 2000, section: "beverages", category: "beverage-energy", image: "/images/menu/powerhorse.cutout.png", orderable: true },

  // Mixology (Cocktails & Mocktails)
  { id: "hibiscus-spritz", name: "Hibiscus Spritz", description: "A sparkling cocktail with bright, floral hibiscus notes.", price: 4500, section: "mixology", category: "mixology-cocktails", image: "/images/menu/hibiscus-fritz.jpg", orderable: true },
  { id: "mango-mule", name: "Mango Mule", description: "A lively mango cocktail with a mule-inspired ginger kick.", price: 5500, section: "mixology", category: "mixology-cocktails", image: "/images/menu/mango-mule.jpg", orderable: true },
  { id: "lagos-sunset", name: "Lagos Sunset", description: "A vibrant, fruit-forward cocktail inspired by a Lagos sunset.", price: 6000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/lagos-sunset.jpg", orderable: true },
  { id: "spiced-old-fashioned", name: "Spiced Old Fashioned", description: "A classic whisky cocktail with warming spice and bittersweet notes.", price: 6500, section: "mixology", category: "mixology-cocktails", image: "/images/menu/old-spiced.webp", orderable: true },
  // Cocktails
  { id: "gourmet-firing-squad", name: "Gourmet Firing Squad", description: "A bold, zesty cocktail with a lively, spicy edge.", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/gourmet-firing-squad.jpg", orderable: true },
  { id: "baby-blue-bond", name: "Baby Blue Bond", description: "A striking blue cocktail with a smooth, refreshing finish.", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/blue-cocktail.jpg", orderable: true },
  { id: "tequila-sunrise", name: "Tequila Sunrise", description: "Tequila, orange, and grenadine come together in this colourful classic.", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/tequila-sunrise.webp", orderable: true },
  { id: "pina-colada", name: "Pina Colada", description: "A creamy tropical cocktail with pineapple and coconut.", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/pina-colada.webp", orderable: true },
  { id: "margarita", name: "Margarita", description: "A bright tequila cocktail with fresh lime notes.", price: 15000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/magarita.webp", orderable: true },
  { id: "mojito", name: "Mojito", description: "A refreshing mix of rum, lime, mint, and soda.", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/mojito.jpg", orderable: true },
  { id: "espresso-martini", name: "Espresso Martini", description: "A smooth coffee cocktail made with espresso and vodka.", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/espresso.jpg", orderable: true },
  { id: "sex-on-the-beach", name: "Sex On The Beach", description: "A fruity vodka cocktail with a bright, refreshing finish.", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/sex-beach.webp", orderable: true },
  { id: "long-island-iced-tea", name: "Long Island Iced Tea", description: "A bold mixed cocktail with citrus notes and a cola finish.", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/long-island.jpg", orderable: true },
  { id: "ice-americano", name: "Ice Americano", description: "A chilled, bittersweet Americano-style cocktail.", price: 12000, section: "mixology", category: "mixology-cocktails", image: "/images/menu/iced-americano.jpg", orderable: true },
  // Mocktails
  { id: "mojito-mocktail", name: "Mojito Mocktail", description: "An alcohol-free mix of lime, mint, and soda, served refreshingly chilled.", price: 8000, section: "mixology", category: "mixology-mocktails", image: "/images/menu/mojito-mocktail.jpg", orderable: true },
  { id: "baby-blue-calm-bond", name: "Baby Blue Calm Bond", description: "A cool blue mocktail with a smooth, fruity finish.", price: 8000, section: "mixology", category: "mixology-mocktails", image: "/images/menu/baby-calm.jpg", orderable: true },
  { id: "gourmet-cool-squad", name: "Gourmet Cool Squad", description: "A chilled house mocktail with a bright, refreshing character.", price: 8000, section: "mixology", category: "mixology-mocktails", image: "/images/menu/gourmet-cool-squad.jpg", orderable: true },
  // Beers
  { id: "action-bitters", name: "Action Bitters", description: "A bottle of herbal bitters, served chilled or over ice.", price: 1500, section: "mixology", category: "mixology-spirits", image: "/images/menu/action-bitters.cutout.png", orderable: true },
  { id: "origin-bitters-pet", name: "Orijin Bitters Pet", description: "A handy bottle of Orijin herbal bitters, served chilled or over ice.", price: 1500, section: "mixology", category: "mixology-spirits", image: "/images/menu/orijin-bitters.cutout.png", orderable: true },
  { id: "guinness-big", name: "Guinness (Big)", description: "A large Guinness stout with a rich, roasted malt character.", price: 2500, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/guiness-big.cutout.webp", orderable: true },
  { id: "guinness-small", name: "Guinness (Small)", description: "A small Guinness stout with a rich, roasted malt character.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/guiness-small.cutout.png", orderable: true },
  { id: "legend", name: "Legend", description: "A chilled Legend lager, ready to enjoy with a meal or on its own.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/legend-beer.cutout.png", orderable: true },
  { id: "large-origin", name: "Large Origin", description: "A large bottle of Orijin herbal drink, served chilled.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/orijin-sweet.cutout.png", orderable: true },
  { id: "heineken", name: "Heineken", description: "A chilled Heineken lager with a crisp, refreshing finish.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/heineken.cutout.png", orderable: true },
  { id: "goldberg", name: "Goldberg", description: "A chilled Goldberg lager, ready to enjoy with a meal or on its own.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/goldberg.cutout.png", orderable: true },
  { id: "castle-lite", name: "Castle lite", description: "A chilled Castle Lite lager with a light, crisp finish.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/castle-lite.cutout.png", orderable: true },
  { id: "gulder", name: "Gulder", description: "A chilled Gulder lager with a full-bodied character.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/gulder.cutout.png", orderable: true },
  { id: "star", name: "Star", description: "A chilled Star lager, ready to enjoy with a meal or on its own.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/star-beer.cutout.png", orderable: true },
  { id: "trophy", name: "Trophy", description: "A chilled Trophy lager, ready to enjoy with a meal or on its own.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/trophy-beer.cutout.png", orderable: true },
  { id: "budweiser", name: "Budweiser", description: "A chilled Budweiser lager with a smooth, refreshing finish.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/budweiser.cutout.png", orderable: true },
  { id: "smirnoff-ice", name: "Smirnoff Ice", description: "A chilled Smirnoff Ice beverage with a bright, refreshing taste.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/smirnoff-ice-big.cutout.png", orderable: true },
  { id: "star-radler", name: "Star Radler", description: "A chilled Star Radler with a light, citrusy character.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/star-radler.cutout.png", orderable: true },
  { id: "kastic", name: "Kastic", description: "An alcoholic herbal bitters drink, served chilled or over ice.", price: 1200, section: "mixology", category: "mixology-spirits", image: "", orderable: true },
  { id: "palm-wine", name: "Palm Wine", description: "Traditional palm wine, served chilled.", price: 2500, section: "mixology", category: "mixology-spirits", image: "/images/menu/palm-wine.jpeg", orderable: true },
  { id: "desperado", name: "Desperado", description: "A chilled Desperados beer with a bold, refreshing character.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/desperado-beer.cutout.png", orderable: true },
  { id: "flying-fish", name: "Flying Fish", description: "A chilled Flying Fish beer with a crisp, refreshing finish.", price: 2000, section: "mixology", category: "mixology-beer-cider", image: "/images/menu/flying-fish.webp", orderable: true },
  // Red Wine
  { id: "four-cousins", name: "Four Cousins", description: "A fruit-forward red wine to enjoy with a meal or share.", price: 15000, section: "mixology", category: "mixology-wine", image: "/images/menu/four-cousins.cutout.png", orderable: true },
  { id: "carlo-rossi", name: "Carlo Rossi", description: "A smooth, approachable red wine for sipping or sharing.", price: 15000, section: "mixology", category: "mixology-wine", image: "/images/menu/carlo-rossi.cutout.png", orderable: true },
  { id: "de-clan", name: "Declan", description: "A red wine with a smooth finish, suited to meals and gatherings.", price: 15000, section: "mixology", category: "mixology-wine", image: "/images/menu/declan.cutout.png", orderable: true },
  { id: "sweet-lips", name: "Sweet Lips", description: "A softly sweet red wine with a fruit-forward character.", price: 20000, section: "mixology", category: "mixology-wine", image: "/images/menu/sweet-lips.cutout.png", orderable: true },
  { id: "maccellis", name: "Macnellis", description: "A smooth red wine for relaxed sipping and sharing.", price: 20000, section: "mixology", category: "mixology-wine", image: "/images/menu/macnellis.webp", orderable: true },
  // Whiskey
  { id: "american-honey", name: "American Honey", description: "A honey-flavoured whiskey liqueur with a smooth, sweet finish.", price: 35000, section: "mixology", category: "mixology-spirits", image: "/images/menu/american-honey.cutout.png", orderable: true },
  { id: "jameson-green", name: "Jameson (Green)", description: "A smooth Irish whiskey, suited to sipping neat or over ice.", price: 40000, section: "mixology", category: "mixology-spirits", image: "/images/menu/jameson-green.cutout.png", orderable: true },
  { id: "jameson-black-barel", name: "Jameson (Black Barel)", description: "A rich Irish whiskey with a mellow, warming finish.", price: 60000, section: "mixology", category: "mixology-spirits", image: "/images/menu/jameson-black.webp", orderable: true },
  { id: "glenfidich-15", name: "Glenfidich (15)", description: "A 15-year-old single malt Scotch whisky for sipping neat or over ice.", price: 120000, section: "mixology", category: "mixology-spirits", image: "/images/menu/glenfidich-15.cutout.webp", orderable: true },
  { id: "glenfidich-12", name: "Glenfidich (12)", description: "A 12-year-old single malt Scotch whisky with a smooth, balanced character.", price: 80000, section: "mixology", category: "mixology-spirits", image: "/images/menu/glendfidich-12.cutout.png", orderable: true },
  { id: "jack-daniel", name: "Jack Daniel", description: "A Tennessee whiskey with a smooth, mellow finish.", price: 35000, section: "mixology", category: "mixology-spirits", image: "/images/menu/jack-daniels.cutout.png", orderable: true },
  { id: "johnny-walker-red-label", name: "Johnny Walker Red Label", description: "A bold blended Scotch whisky, suited to sipping or mixing.", price: 25000, section: "mixology", category: "mixology-spirits", image: "/images/menu/red-label.cutout.png", orderable: true },
  { id: "william-lawson-small", name: "William Lawson Small", description: "A small serving of William Lawson?s blended Scotch whisky.", price: 7000, section: "mixology", category: "mixology-spirits", image: "/images/menu/william-lawson-small.cutout.png", orderable: true },
  { id: "best-whiskey", name: "Best Whiskey", description: "A smooth whisky, served neat or over ice.", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/best-whiskey.cutout.png", orderable: true },
  { id: "glenfidich", name: "Glenfidich", description: "A single malt Scotch whisky for sipping and savouring.", price: 160000, section: "mixology", category: "mixology-spirits", image: "/images/menu/glendfidich-18.cutout.png", orderable: true },
  // { id: "glenfidich-160", name: "Glenfidich", description: "", price: 160000, section: "mixology", category: "mixology", image: "", orderable: true },
  // De Gin
  { id: "small-gordon", name: "Small Gordon", description: "A small serving of Gordon?s gin, ready to enjoy chilled or mixed.", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/small-gordons.cutout.png", orderable: true },
  { id: "gordon-dry-gin", name: "Gordon Dry Gin", description: "A classic dry gin with a crisp, juniper-led character.", price: 12000, section: "mixology", category: "mixology-spirits", image: "/images/menu/gordons-big.cutout.png", orderable: true },
  { id: "bombay-sapphine", name: "Bombay Sapphine", description: "A London dry gin with a bright botanical character.", price: 45000, section: "mixology", category: "mixology-spirits", image: "/images/menu/bombay-sapphine.cutout.png", orderable: true },
  // Vodka
  { id: "smirnoff", name: "Smirnoff", description: "A smooth vodka, suited to sipping chilled or mixing into cocktails.", price: 12000, section: "mixology", category: "mixology-spirits", image: "/images/menu/smirnoff-vodkha.cutout.png", orderable: true },
  { id: "smirnoff-chocolate-small", name: "Smirnoff Chocolate Small", description: "A small serving of chocolate-flavoured Smirnoff liqueur.", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/smirnoff-chocolate.cutout.png", orderable: true },
  { id: "flirt-vodka", name: "Flirt Vodka", description: "A smooth vodka, served chilled or mixed into a cocktail.", price: 18000, section: "mixology", category: "mixology-spirits", image: "/images/menu/flirt-vodkha.cutout.png", orderable: true },
  // Champagne
  { id: "velve-rosee", name: "Velve Rosee", description: "A delicate ros? champagne for celebrations and special occasions.", price: 25000, section: "mixology", category: "mixology-wine", image: "/images/menu/moet-chandon.cutout.webp", orderable: true },
  { id: "moet-nectar-rose", name: "Moet Nectar Rose", description: "A rich ros? champagne with a smooth, celebratory finish.", price: 160000, section: "mixology", category: "mixology-wine", image: "/images/menu/moet-nectar.cutout.png", orderable: true },
  // Whiskey (Hennessy)
  { id: "henessy-vsop", name: "Hennessy VSOP", description: "A well-rounded VSOP cognac for sipping neat or over ice.", price: 150000, section: "mixology", category: "mixology-spirits", image: "/images/menu/hennessy-vsop.cutout.png", orderable: true },
  { id: "henessy-vs", name: "Hennessy VS", description: "A smooth VS cognac, suited to sipping or mixing.", price: 100000, section: "mixology", category: "mixology-spirits", image: "/images/menu/henessy-vs.cutout.png", orderable: true },
  { id: "remmy-vsop", name: "Remmy VSOP", description: "A mellow VSOP cognac for relaxed sipping.", price: 130000, section: "mixology", category: "mixology-spirits", image: "/images/menu/remy-vsop.cutout.png", orderable: true },
  // Baileys
  { id: "baileys-big-original", name: "Baileys Big Original", description: "A large serving of Baileys Irish cream liqueur, best enjoyed chilled or over ice.", price: 30000, section: "mixology", category: "mixology-spirits", image: "/images/menu/baileys-original.cutout.png", orderable: true },
  // Campari
  { id: "campari", name: "Campari", description: "A distinctive bittersweet Italian aperitif, served chilled or mixed.", price: 28000, section: "mixology", category: "mixology-spirits", image: "/images/menu/campari.cutout.png", orderable: true },
  { id: "small-campari", name: "Small Campari", description: "A small serving of Campari, the bittersweet Italian aperitif.", price: 9000, section: "mixology", category: "mixology-spirits", image: "/images/menu/campari-small.cutout.png", orderable: true },
  // Best cream
  { id: "best-cream", name: "Best Cream", description: "A smooth cream liqueur, served chilled or over ice.", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/best-cream.cutout.png", orderable: true },
  // Tequila
  { id: "omealca-blanco-blue", name: "Omelca Blanco (Blue)", description: "A crisp blanco tequila, suited to sipping or mixing into cocktails.", price: 45000, section: "mixology", category: "mixology-spirits", image: "/images/menu/omelca-blue.webp", orderable: true },
  { id: "omealca-blanco-dark-chocolate", name: "Omelca Blanco (Dark Chocolate)", description: "A smooth chocolate-flavoured tequila liqueur, served chilled or over ice.", price: 50000, section: "mixology", category: "mixology-spirits", image: "/images/menu/omelca-black.cutout.png", orderable: true },
  { id: "shot-tequila", name: "Tequila Shot", description: "A shot of tequila, served ready to enjoy.", price: 4000, section: "mixology", category: "mixology-spirits", image: "/images/menu/tequila-shotS.jpg", orderable: true },
  { id: "shot-vodka", name: "Vodka Shot", description: "A shot of vodka, served chilled.", price: 3000, section: "mixology", category: "mixology-spirits", image: "/images/menu/vodka-shots.jpg", orderable: true },
];

export const getItemsBySection = (section: MenuSection) => menuItems.filter((i) => i.section === section);
export const getFeaturedItems = () => menuItems.filter((i) => i.featured);
