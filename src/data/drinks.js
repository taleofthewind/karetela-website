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
        id: "cone-twirl",
        name: "Cone Twirl",
        description:
          "A classic favorite! Choose from chocolate, vanilla, or mix for the perfect swirl of happiness.",
        price: "",
        image: "",
      },
      {
        id: "chocolate-sundae",
        name: "Chocolate Sundae (Sample)",
        description: "Creamy ice cream with rich chocolate sauce and a crunchy wafer on top.",
        price: "",
        image: "chocolate-sundae.jpg",
      },
      {
        id: "cookies-cream-shake",
        name: "Cookies & Cream Shake (Sample)",
        description: "A thick, chilled shake blended with crushed cookies and topped with cream.",
        price: "",
        image: "cookies-cream-shake.jpg",
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
        id: "orange-slush",
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