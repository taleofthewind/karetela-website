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
        description: "Icy fruit drinks in your favorite flavor, perfect for a hot day.",
        price: "50",
        image: "lemonade.png",
      },
        {
        id: "orange-slush",
        name: "Mango Lemonade",
        description: "Bright, fruity, and ice cold. A refreshing pick-me-up.",
        price: "50",
        image: "mango.png",
      },
      {
        id: "cucumber-drink",
        name: "Cucumber Lemonade",
        description: "A sweet and icy slush that cools you down in one sip.",
        price: "50",
        image: "cucumber.png",
      },
      {
        id: "four-season",
        name: "Four Season Lemonade",
        description: "Bright, fruity, and ice cold. A refreshing pick-me-up.",
        price: "50",
        image: "4seasons.png",
      },
        {
        id: "iced-tea",
        name: "Iced Tea House Blend",
        description: "Bright, fruity, and ice cold. A refreshing pick-me-up.",
        price: "50",
        image: "icedti.png",
      },
        {
        id: "orange-slush",
        name: "Pineapple Lemonade",
        description: "Bright, fruity, and ice cold. A refreshing pick-me-up.",
        price: "50",
        image: "pineapple.png",
      },
        {
        id: "red-tea",
        name: "Red Iced Tea",
        description: "Bright, fruity, and ice cold. A refreshing pick-me-up.",
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