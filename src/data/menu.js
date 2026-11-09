/*
  THE MENU. This is the only file you edit to change what shows on the Menu page.

  - Photos go in  src/assets/images/menu/  (file name must match the "image" below).
    A missing photo shows a neutral placeholder, nothing breaks.
  - category must be one of: "pastries" | "breads" | "custom"
  - price is text so you can write "1,200+" for starting prices.

  PLACEHOLDERS: the names, prices and descriptions below come from the design mockup.
  Replace them with the real menu and real prices before launch.
*/
const files = import.meta.glob("@/assets/images/menu/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const img = (name) => {
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}`));
  return key ? files[key] : null;
};

export const menuTabs = [
  { id: "all", label: "All Items" },
  { id: "kusina", label: "Kusina Meals" },
  { id: "breads", label: "Fresh Breads" },
  { id: "pastries", label: "Fresh Cakes" },
  { id: "custom", label: "Custom Cakes" },
];

const items = [
  // ---------- Fresh Pastries ----------
  {
    id: "strawberry-cake",
    category: "pastries",
    name: "Strawberry Cake",
    price: "500",
    description: "a classic, fruit-forward dessert known for its tender, moist crumb, vibrant pink or natural hue, and sweet-tart berry flavor.",
    image: "pastries/pastry1.jpg",
  },
  {
    id: "caramel-cake",
    category: "pastries",
    name: "Caramel Cake",
    price: "500",
    description: "a sweet dessert featuring a tender cake base paired with rich, deeply flavored caramel frosting or glaze.",
    image: "pastries/pastry2.jpg",
  },
  {
    id: "choco-caramel-cakes",
    category: "pastries",
    name: "Choco Caramel Cake",
    price: "500",
    description: "a decadent dessert that pairs a moist, rich chocolate cake base with sweet, buttery, or salted caramel.",
    image: "pastries/pastry3.jpg",
  },
  {
    id: "blueberry-muffin",
    category: "pastries",
    name: "Choco Sprinkled Cake",
    price: "500",
    description: "a classic, nostalgic party treat that ranges from traditional birthday layers covered in rainbow jimmies to viral single-serving sensations.",
    image: "pastries/pastry4.jpg",
  },
  {
    id: "round-cake",
    category: "pastries",
    name: "Round Frosted Cake",
    price: "500",
    description: ": A smooth or piped coat that completely hides the cake layers, created using tools like an offset spatula and bench scraper.",
    image: "pastries/pastry5.jpg",
  },
  {
    id: "choco-round-cake",
    category: "pastries",
    name: "Chocolate Round Cake",
    price: "500",
    description: "A rich and moist chocolate round cake layered with smooth, creamy chocolate frosting, delivering a delightful chocolate flavor in every bite. Perfect for celebrations and sweet cravings!",
    image: "pastries/pastry6.jpg",
  },
   {
    id: "cookies-cake",
    category: "pastries",
    name: "Cookies & Cream Oreo Cake",
    price: "500",
    description: "A soft and creamy cake layered with luscious cookies & cream frosting, topped with crushed Oreo cookies for the perfect blend of chocolatey crunch and sweetness. A delightful treat for every Oreo lover!.",
    image: "pastries/pastry7.jpg",
  },

  // ---------- Fresh Breads ----------
  {
    id: "pandesiosa",
    category: "breads",
    name: "Pandesiosa",
    price: "60",
    description: "a popular Filipino pull-apart sweet bread roll originating from the Visayas region, particularly in cities like Bacolod and Iloilo.",
    image: "breads/bread1.jpg",
  },
  {
    id: "ensaymada",
    category: "breads",
    name: "Ensaymada",
    price: "20",
    description: "A soft, fluffy Filipino pastry topped with rich buttercream and a generous sprinkle of grated cheese. Sweet, buttery, and delightfully cheesy in every bite—perfect for merienda or a morning treat!",
    image: "breads/bread2.jpg",
  },
  {
    id: "ensaymada",
    category: "breads",
    name: "Ube Ensaymada",
    price: "20",
    description: "A soft, fluffy Filipino pastry topped with rich buttercream and a generous sprinkle of grated cheese. Sweet, buttery, and delightfully cheesy in every bite—perfect for merienda or a morning treat!.",
    image: "breads/bread3.jpg",
  },
  {
    id: "whole-wheat-bread",
    category: "breads",
    name: "Classic Custard Cake",
    price: "25",
    description: "A soft, moist, and fluffy vanilla sponge cake topped with a rich, silky custard layer and a touch of caramel sweetness. A classic Filipino favorite that's creamy, smooth, and irresistible in every slice",
    image: "breads/bread4.jpg",
  },
  {
    id: "pianono",
    category: "breads",
    name: "Pianono",
    price: "15",
    description: "Soft, fluffy, and freshly baked Filipino pandesal with a lightly golden crust and a delicate bread-crumb coating. Perfectly warm and delicious, making every breakfast or snack extra special!.",
    image: "breads/bread5.jpg",
  },
    {
    id: "tinapay1",
    category: "breads",
    name: "Pinoy Hopia",
    price: "55",
    description: "A delicious Filipino pastry with a flaky, golden crust and a sweet, flavorful filling. Soft, rich, and satisfying in every bite, making it a perfect treat for merienda or anytime cravings!.",
    image: "breads/bread7.jpg",
  },
    {
    id: "tinapay2",
    category: "breads",
    name: "Cupcake with Raisins",
    price: "55",
    description: "A soft and fluffy cupcake baked to golden perfection, filled with sweet raisins that add a delightful burst of flavor in every bite. A simple yet delicious homemade treat, perfect for breakfast or merienda!",
    image: "breads/bread8.jpg",
  },
    {
    id: "tinapay3",
    category: "breads",
    name: "Spanish Bread",
    price: "55",
    description: "A soft and fluffy Filipino bread roll filled with sweet, buttery breadcrumbs and coated with a delicate layer of toasted crumbs. Slightly sweet, rich, and comforting—perfect for your afternoon merienda!",
    image: "breads/bread9.jpg",
  },
    {
    id: "tinapay4",
    category: "breads",
    name: "Ube Mamon",
    price: "55",
    description: "A light, soft, and fluffy Filipino sponge cake infused with the sweet, creamy flavor of ube. Moist, buttery, and delightfully airy, making it a perfect treat for every ube lover!",
    image: "breads/bread10.jpg",
  },
    {
    id: "tinapay5",
    category: "breads",
    name: "Banana Muffin",
    price: "12",
    description: "A soft and fluffy muffin made with ripe, sweet bananas, baked to golden perfection for a naturally rich and comforting flavor. Moist, tender, and delicious in every bite—perfect for breakfast or merienda!",
    image: "breads/bread11.jpg",
  },
    {
    id: "tinapay6",
    category: "breads",
    name: "Putok",
    price: "7",
    description: "A soft and fluffy Filipino bread with a lightly sweet flavor and a golden, crusty top. Enjoy its tender texture and simple, comforting taste—perfect with a cup of coffee or your favorite afternoon drink!",
    image: "breads/bread12.jpg",
  },
    {
    id: "tinapay7",
    category: "breads",
    name: "Ube Pandesiosa",
    price: "10",
    description: "Soft, fluffy Filipino pandesal infused with the sweet, creamy flavor of ube and coated with delicate breadcrumbs. A delightful combination of classic bread goodness and rich ube sweetness, perfect for breakfast or merienda!",
    image: "breads/bread13.jpg",
  },
    {
    id: "tinapay8",
    category: "breads",
    name: "Pan de coco",
    price: "10",
    description: "A soft and fluffy Filipino bread roll filled with sweet, rich coconut filling made from freshly grated coconut and caramelized sugar. Slightly chewy, deliciously sweet, and perfect for your afternoon merienda!",
    image: "breads/pandecoco.jpg",
  },
    {
    id: "tinapay9",
    category: "breads",
    name: "Brownish",
    price: "20",
    description: "Rich, fudgy, and chocolatey brownies with a soft, moist center and a slightly crisp top. Every bite is packed with irresistible chocolate goodness, making it the perfect sweet treat!",
    image: "breads/browinish.webp",
  },
    {
    id: "tinapay10",
    category: "breads",
    name: "Caramel Bar",
    price: "20",
    description: "A soft and chewy caramel bar with a rich buttery flavor and a deliciously sweet caramel layer. Golden, tender, and irresistibly satisfying, making it a perfect treat for anyone with a sweet tooth!",
    image: "breads/caramelbar.webp",
  },
  {
    id: "tinapay11",
    category: "breads",
    name: "Egg Pie",
    price: "20",
    description: "A classic Filipino egg pie featuring a smooth, creamy custard filling nestled in a flaky, golden-brown crust. Rich, sweet, and delightfully silky in every slice—a comforting treat perfect for merienda!",
    image: "breads/eggpie.webp",
  },
  {
    id: "tinapay12",
    category: "breads",
    name: "Cheese Bread",
    price: "20",
    description: "A soft and fluffy bread topped with a generous layer of melted cheese, offering the perfect balance of buttery richness and savory goodness. Lightly golden, deliciously cheesy, and perfect for breakfast or merienda!",
    image: "breads/cheesebread.webp",
  },
{
    id: "tinapay13",
    category: "breads",
    name: "Monay",
    price: "7",
    description: "A classic Filipino bread with a thick, soft, and slightly chewy texture, featuring a golden-brown crust and a mildly sweet flavor. Hearty, freshly baked, and perfect when paired with coffee or your favorite spread.",
    image: "breads/monay.webp",
},
{
    id: "tinapay14",
    category: "breads",
    name: "Krinkles",
    price: "5",
    description: "Soft, fudgy, and rich chocolate cookies coated in a delicate layer of powdered sugar, creating their signature cracked appearance. Sweet, chewy, and packed with chocolate goodness in every bite!",
    image: "breads/krinkles.webp",
},

  // ---------- Custom Cakes ----------
  {
    id: "custom-cake",
    category: "custom",
    name: "Mobile Legends Cake",
    price: "500",
    description: "Custom cakes for birthdays, celebrations, and special moments.",
    image: "custom/mobleg.jpg",
  },
  {
    id: "cupcake-box",
    category: "custom",
    name: "Jordan Cake",
    price: "450+",
    description: "Perfect for birthdays, celebrations, and special moments.",
    image: "jordancake.jpg",
  },

    // ---------- Kusina Meals ----------
  {
    id: "coco-fish",
    category: "kusina",
    name: "Coco Fish Fillet Strips",
    price: "75",
    description: "a boneless (or nearly boneless) cut of flesh sliced lengthwise from the side of a fish, parallel to the backbone.",
    image: "kusina/chickenstrips.webp",
  },
  {
    id: "lomi",
    category: "kusina",
    name: "Lomi",
    price: "60",
    description: "a popular Filipino-Chinese comfort food consisting of thick, fresh yellow egg noodles (miki) served in a rich, gooey, and savory soup.",
    image: "kusina/lomi.webp",
  },
  {
    id: "mami",
    category: "kusina",
    name: "Mami",
    price: "60",
    description: "a popular Filipino-Chinese wheat noodle soup made with fresh egg noodles, a hot savory broth, and tender meat or dumplings.",
    image: "kusina/mickey.webp",
  },
  {
    id: "monggo",
    category: "kusina",
    name: "Monggo with Ampalaya",
    price: "30",
    description: "a traditional, hearty Filipino comfort food made of tender-cooked mung beans combined with bitter melon or bitter gourd leaves.",
    image: "kusina/monggo.webp",
  },
  {
    id: "torta",
    category: "kusina",
    name: "Tortang Talong",
    price: "30",
    description: "a popular Filipino comfort food made by pan-frying a whole, grilled eggplant dipped in a seasoned beaten egg mixture.",
    image: "kusina/torta.webp",
  },
  {
    id: "tocino",
    category: "kusina",
    name: "Tocino",
    price: "30",
    description: "a popular Filipino sweet-and-savory cured meat typically made from thin slices of pork shoulder, belly, or loin.",
    image: "kusina/tocino.jpg"
  },
  {
    id: "dinakdakan",
    category: "kusina",
    name: "Dinakdakan",
    price: "30",
    description: "a traditional savory and tangy delicacy from the Ilocos region of the Philippines.",
    image: "kusina/dinakdakan.jpg"
  },
  {
    id: "sisigs",
    category: "kusina",
    name: "Sisig",
    price: "30",
    description: "a famous Filipino dish originating from the Pampanga region of Luzon. It is known for its crispy, savory, tangy, and spicy flavor profile, traditionally served hot on a sizzling cast-iron plate.",
    image: "kusina/sisig.jpg"
  },
  {
    id: "adobo",
    category: "kusina",
    name: "Chicken Adobo",
    price: "30",
    description: "Tender chicken pieces simmered in a savory blend of soy sauce, vinegar, garlic, and aromatic spices, creating a rich, flavorful sauce. A classic Filipino comfort food best enjoyed with a warm serving of rice.",
    image: "kusina/adobo.jpg"
  },


];

export const menuItems = items.map((item) => ({ ...item, image: img(item.image) }));