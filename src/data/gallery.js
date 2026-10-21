/*
  Put your product photos in  src/assets/images/gallery/

  1) List a photo below to give it a name and details (file name must match exactly).
  2) Any photo in the folder that is NOT listed still shows up, with a caption made
     from its file name (01-soft-buns.jpg -> "Soft Buns") and no extra details.
  Photos listed here but missing from the folder are skipped, so nothing breaks.

  Fields (all optional except file and name):
    category     small label on the hover caption         e.g. "French Pastry"
    tag          small label on the details card          e.g. "Signature Pastry"
    kind         used in the button: "Inquire About This ___"   e.g. "Pastry"
    name         the big title
    description  a sentence or two
    price        text, shown as  P 45.00   (leave out to hide the price)
    badge        gold pill next to the price               e.g. "Best Seller" (leave out to hide)

  PLACEHOLDERS: replace these with your real products.
*/
const files = import.meta.glob("@/assets/images/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const listed = [
  {
    file: "bread.jpg",
    category: "Bread",
    tag: "French Pastry",
    kind: "Pastry",
    name: "Almond Croissant",
    description: "Buttery, flaky croissant topped with sliced almonds, baked fresh every morning.",
  },
  {
    file: "02-assorted-pastries.jpg",
    category: "Bakery",
    tag: "Fresh From the Oven",
    kind: "Pastry",
    name: "Assorted Pastries",
    description: "A mix of our freshly baked pastries, perfect for sharing.",
  },
  {
    file: "03-soft-buns.jpg",
    category: "Bread",
    tag: "Fresh Bread",
    kind: "Bread",
    name: "Soft Buns",
    description: "Soft, fluffy buns baked for your everyday cravings.",
  },
  {
    file: "04-kusina-meals.jpg",
    category: "Kusina",
    tag: "Home-style Meal",
    kind: "Meal",
    name: "Home-style Meals",
    description: "Filipino favorites cooked the way home tastes best.",
  },
  {
    file: "05-oreo-delight.jpg",
    category: "Signature Pastry",
    tag: "Signature Pastry",
    kind: "Pastry",
    name: "Oreo Delight",
    description:
      "Soft and fluffy pastry filled with creamy vanilla, topped with rich whipped cream and crushed Oreo cookies.",
    price: "45.00",
    badge: "Best Seller",
  },
];

const toCaption = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const entries = Object.entries(files).sort(([a], [b]) =>
  a.localeCompare(b, undefined, { numeric: true })
);

const find = (name) => entries.find(([path]) => path.endsWith(`/${name}`));

const fromList = listed
  .map((item) => {
    const hit = find(item.file);
    return hit ? { ...item, src: hit[1] } : null;
  })
  .filter(Boolean);

const listedFiles = new Set(listed.map((i) => i.file));

const extras = entries
  .filter(([path]) => !listedFiles.has(path.split("/").pop()))
  .map(([path, src]) => ({ category: "Karetela", name: toCaption(path), src }));

export const galleryItems = [...fromList, ...extras];