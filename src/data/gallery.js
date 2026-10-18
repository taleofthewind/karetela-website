/*
  Put your product photos in  src/assets/images/gallery/
  1) List a photo below to give it a category + name (file name must match exactly).
  2) Any photo in the folder that is NOT listed still shows up, with a caption made
     from its file name (01-soft-buns.jpg -> "Soft Buns").
  Photos listed here but missing from the folder are skipped, so nothing breaks.
*/
const files = import.meta.glob("@/assets/images/gallery/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

// PLACEHOLDERS: replace with your real products
const listed = [
  { file: "01-almond-croissant.jpg", category: "French Pastry", name: "Almond Croissant" },
  { file: "02-assorted-pastries.jpg", category: "Bakery", name: "Assorted Pastries" },
  { file: "03-soft-buns.jpg", category: "Bread", name: "Soft Buns" },
  { file: "04-kusina-meals.jpg", category: "Kusina", name: "Home-style Meals" },
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