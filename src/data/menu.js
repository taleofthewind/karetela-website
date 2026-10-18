/*
  THE MENU. This is the only file you edit to change what shows on the Menu page.

  - Photos go in  src/assets/images/menu/  (file name must match the "image" below).
    A missing photo shows a neutral placeholder, nothing breaks.
  - category must be one of: "pastries" | "breads" | "custom"
  - price is text so you can write "1,200+" for starting prices.

  PLACEHOLDERS: the names, prices and descriptions below come from the design mockup.
  Replace them with the real menu and real prices before launch.
*/
const files = import.meta.glob("@/assets/images/menu/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const img = (name) => {
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}`));
  return key ? files[key] : null;
};

export const menuTabs = [
  { id: "all", label: "All Items" },
  { id: "pastries", label: "Fresh Cakes" },
  { id: "breads", label: "Fresh Breads" },
  { id: "custom", label: "Custom Cakes" },
];

const items = [
  // ---------- Fresh Pastries ----------
  {
    id: "strawberry-cake",
    category: "pastries",
    name: "Strawberry Cake",
    price: "35",
    description: "Soft, fluffy donuts topped with rich chocolate and colorful sprinkles \u2014 a classic favorite.",
    image: "pastry1.jpg",
  },
  {
    id: "caramel-cake",
    category: "pastries",
    name: "Caramel Cake",
    price: "60",
    description: "Buttery, flaky and golden \u2014 the perfect balance of crisp and soft in every bite.",
    image: "pastry2.jpg",
  },
  {
    id: "caramel-cakes",
    category: "pastries",
    name: "Choco Caramel Cake",
    price: "65",
    description: "Flaky pastry filled with rich dark chocolate.",
    image: "pastry3.jpg",
  },
  {
    id: "blueberry-muffin",
    category: "pastries",
    name: "Blueberry Muffin",
    price: "55",
    description: "Moist and fluffy with real blueberries in every bite.",
    image: "pastry4.jpg",
  },
  {
    id: "cinnamon-roll",
    category: "pastries",
    name: "Cinnamon Roll",
    price: "65",
    description: "Soft, sweet and topped with creamy cinnamon glaze.",
    image: "pastry5.jpg",
  },
  {
    id: "fruit-danish",
    category: "pastries",
    name: "Fruit Danish",
    price: "60",
    description: "Flaky pastry with a sweet fruit filling.",
    image: "pastry6.jpg",
  },
   {
    id: "fruit-danish",
    category: "pastries",
    name: "Fruit Danish",
    price: "60",
    description: "Flaky pastry with a sweet fruit filling.",
    image: "pastry7.jpg",
  },

  // ---------- Fresh Breads ----------
  {
    id: "pandesal",
    category: "breads",
    name: "Pandesal",
    price: "12",
    description: "Soft, fluffy, and perfectly baked for your everyday cravings.",
    image: "bread1.jpg",
  },
  {
    id: "white-loaf-bread",
    category: "breads",
    name: "White Loaf Bread",
    price: "85",
    description: "Classic and versatile \u2014 perfect for sandwiches and toast.",
    image: "bread2.jpg",
  },
  {
    id: "ensaymada",
    category: "breads",
    name: "Ensaymada",
    price: "45",
    description: "Soft bread with sweet butter and cheese on top.",
    image: "bread3.jpg",
  },
  {
    id: "whole-wheat-bread",
    category: "breads",
    name: "Whole Wheat Bread",
    price: "95",
    description: "Healthy, hearty, and full of goodness.",
    image: "bread4.jpg",
  },
  {
    id: "cheese-bread",
    category: "breads",
    name: "Cheese Bread",
    price: "55",
    description: "Soft bread with a savory cheese filling.",
    image: "bread5.jpg",
  },
  {
    id: "ube-bread",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread6.jpg",
  },
    {
    id: "tinapay1",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread7.jpg",
  },
    {
    id: "tinapay2",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread8.jpg",
  },
    {
    id: "tinapay3",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread9.jpg",
  },
    {
    id: "tinapay4",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread10.jpg",
  },
    {
    id: "tinapay5",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread11.jpg",
  },
    {
    id: "tinapay6",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread12.jpg",
  },
    {
    id: "tinapay7",
    category: "breads",
    name: "Ube Bread",
    price: "55",
    description: "A sweet and fluffy bread with real ube flavor.",
    image: "bread13.jpg",
  },

  // ---------- Custom Cakes ----------
  {
    id: "custom-cake",
    category: "custom",
    name: "Custom Cake (Sample)",
    price: "1,200+",
    description: "Custom cakes for birthdays, celebrations, and special moments.",
    image: "mobleg.jpg",
  },
  {
    id: "cupcake-box",
    category: "custom",
    name: "Jordan Cake",
    price: "450+",
    description: "Perfect for birthdays, celebrations, and special moments.",
    image: "jordancake.jpg",
  },
];

export const menuItems = items.map((item) => ({ ...item, image: img(item.image) }));