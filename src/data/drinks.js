/*
  COOLERS & DRINKS: the front page section only. These are NOT part of the Menu page.

  - Photos go in  src/assets/images/drinks/  (you may use sub-folders, for example
    drinks/coolers/cone-twirl.jpg, and then write  image: "coolers/cone-twirl.jpg" ).
  - A missing photo shows "Photo coming soon", nothing breaks.
  - price is optional text. Leave it out (or "") and the card shows  P ---  like the design.
  - To add a drink, copy one block. To add a tab, copy a whole { id, label, items } group.

  PLACEHOLDERS: replace the sample names, texts and photos with the real ones.
*/
const files = import.meta.glob("@/assets/images/drinks/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const img = (name) => {
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}`));
  return key ? files[key] : null;
};

const tabs = [
  {
    id: "coolers",
    label: "Sundaes & Swirls",
    items: [
      {
        id: "coke-float",
        name: "Coke Float",
        description:
        "a sweet, dessert-like beverage made by pouring Coca-Cola over scoops of vanilla ice cream.",
        price: "45",
        image: "cokefloat.png",
      },
      {
        id: "overload-sundae",
        name: "Overload Sundae",
        description: "an indulgent, heavily stacked ice cream dessert loaded with multiple layers of sweet, crunchy, and rich toppings.",
        price: "34",
        image: "overload.png",
      },
      {
        id: "strawberry-sundae",
        name: "Strawberry Sundae",
        description: "a classic, refreshing dessert featuring cool and creamy ice cream—typically vanilla or strawberry soft-serve—generously layered or topped with sweet strawberry sauce or syrup.",
        price: "34",
        image: "strawberry.png",
      },
      {
        id: "blueberry-sundae",
        name: "Blueberry Sundae",
        description: "a creamy dessert featuring vanilla soft-serve or ice cream layered and topped with a sweet, tangy blueberry sauce or compote..",
        price: "34",
        image: "blueberry.png",
      },
        {
        id: "caramel-sundae",
        name: "Caramel Sundae",
        description: " is a classic frozen dessert featuring creamy vanilla soft-serve or ice cream smothered in a rich, buttery, golden caramel sauce.",
        price: "34",
        image: "caramel.png",
      },
      {
        id: "mango-sundae",
        name: "Mango Sundae",
        description: " is a classic frozen dessert featuring creamy vanilla soft-serve or ice cream smothered in a rich, buttery, golden caramel sauce.",
        price: "34",
        image: "mango-sundae.png",
      },
      {
        id: "choco-sundae",
        name: "Choco Sundae",
        description: " is a classic frozen dessert featuring creamy vanilla soft-serve or ice cream smothered in a rich, buttery, golden caramel sauce.",
        price: "34",
        image: "choco.png",
      },
      {
        id: "vanilla-sundae",
        name: "Vanilla Cone Sundae",
        description: " is a classic frozen dessert featuring creamy vanilla soft-serve or ice cream smothered in a rich, buttery, golden caramel sauce.",
        price: "20",
        image: "vanilla.png",
      },
      {
        id: "choco-cone-sundae",
        name: "Choco Cone Sundae",
        description: " is a classic frozen dessert featuring creamy vanilla soft-serve or ice cream smothered in a rich, buttery, golden caramel sauce.",
        price: "20",
        image: "chocolate-cone.png",
      },
        {
        id: "mixed-sundae",
        name: "Mixed Cone Sundae",
        description: " is a classic frozen dessert featuring creamy vanilla soft-serve or ice cream smothered in a rich, buttery, golden caramel sauce.",
        price: "20",
        image: "mixed.png",
      },
    ],
  },
  {
    id: "drinks",
    label: "Refreshing Slushies",
    items: [
      {
        id: "blue-lemonade",
        name: "Blue Lemonade",
        description: "a bright, icy, semi-frozen beverage defined by its vibrant blue color and sweet-and-tangy candy flavor.",
        price: "50",
        image: "lemonade.png",
      },
        {
        id: "mango-slush",
        name: "Mango",
        description: "a cold, refreshing tropical drink made by blending ripe or frozen mango pulp with ice, juice, water, or sweeteners",
        price: "50",
        image: "mango.png",
      },
      {
        id: "cucumber-drink",
        name: "Cucumber",
        description: "a crisp, ultra-refreshing, botanical frozen drink known for its clean, spa-like flavor and pale-green color.",
        price: "50",
        image: "cucumber.png",
      },
      {
        id: "four-season",
        name: "Four Season",
        description: "a frozen, icy adaptation of the classic tropical four seasons fruit blend.",
        price: "50",
        image: "4seasons.png",
      },
        {
        id: "iced-tea",
        name: "Iced Tea House Blend",
        description: "a cold, semi-frozen beverage made by churning, blending, or freezing brewed iced tea into an icy, crystal-textured treat.",
        price: "50",
        image: "icedti.png",
      },
        {
        id: "orange-slush",
        name: "Pineapple",
        description: "a cold, refreshing, semi-frozen tropical drink made by blending fresh, frozen, or canned pineapple with ice cubes, water, or fruit juice.",
        price: "50",
        image: "pineapple.png",
      },
        {
        id: "red-tea",
        name: "Red Iced Tea",
        description: "a frosty, semi-frozen beverage that blends the tangy, sweet-tart profile of red iced tea into a crushed-ice or blended-ice treat.",
        price: "50",
        image: "red-teas.png",
      },
    ],
  },
];

export const drinkTabs = tabs.map((tab) => ({
  ...tab,
  items: tab.items.map((item) => ({ ...item, image: img(item.image) })),
}));