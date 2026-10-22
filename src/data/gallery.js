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
    tag: "Filipino Pastry",
    kind: "Pastry",
    name: "Ensaymada",
    description: "a soft, sweet, and buttery Filipino brioche pastry topped with a rich layer of butter, sugar, and a generous amount of grated cheese.",
  },
  {
    file: "strawberry.jpg",
    category: "Cake",
    tag: "French Pastry",
    kind: "Cake",
    name: "Strawberry Cake",
    description: "A sweet, light, and refreshing dessert featuring a soft, moist sponge or butter cake base infused or layered with strawberries.",
  },
    {
    file: "mamon.jpg",
    category: "Soft Bread",
    tag: "Pinoy Bread",
    kind: "Pastry",
    name: "Mamon",
    description: "A traditional Filipino-style light, airy, and buttery mini chiffon or sponge cake baked in individual cupcake molds.",
  },
      {
    file: "hopia.jpg",
    category: "Pinoy Meryenda",
    tag: "Bread",
    kind: "Bread",
    name: "Pinoy Hopia",
    description: "A popular Filipino baked pastry with a soft, flaky or cookie-like crust and a sweet or savory filling, inspired by Chinese bakpia.",
  },
    {
    file: "lomi.jpg",
    category: "Pinoy Meryenda",
    tag: "Meryenda",
    kind: "Meal",
    name: "Lomi",
    description: "a popular Filipino comfort food consisting of thick, chewy fresh egg noodles (miki) soaked in lye water and cooked in a rich, thick, and savory broth.",
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