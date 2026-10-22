/*
  The three cards in the "Our Menu" section.
  Photos go in  src/assets/images/menu-categories/  (file names must match below).
  If a photo is missing the card still shows, just with a dark background.
  "to" is where the card links. The Menu page can read ?category=... later.
*/
const files = import.meta.glob("@/assets/images/menu-categories/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const img = (name) => {
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}`));
  return key ? files[key] : null;
};

export const menuCategories = [
  {
    id: "pastries",
    title: "Fresh Cakes",
    text: "Sweet treats for every moment",
    image: img("pastry7.jpg"),
    to: "/menu?category=pastries",
  },
  {
    id: "breads",
    title: "Fresh Breads",
    text: "Soft, fluffy, and always fresh",
    image: img("bread1.jpg"),
    to: "/menu?category=breads",
  },
  {
    id: "custom",
    title: "Custom Cakes & Pastries",
    text: "Made to order for your celebration",
    image: img("pastry1.jpg"),
    to: "/menu?category=custom",
  },
];