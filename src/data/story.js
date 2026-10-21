/*
  The "Our Story" section on the Home page.

  - Photos go in  src/assets/images/story/  and show up automatically.
    Name them with a number first to set the order: 01-making-dough.jpg, 02-fresh-bread.jpg ...
    PORTRAIT photos work best (about 2:3, at least 900px tall), 3 to 5 of them.
  - The wording below comes from the design mockup. Check it with the client and
    replace it with their real story.
*/
const files = import.meta.glob("@/assets/images/story/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const toCaption = (path) =>
  path
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_ ]*/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export const storyPhotos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, src]) => ({ src, alt: toCaption(path) }));

export const story = {
  eyebrow: "Our Story",
  title: "More Than Just a Bakery",
  paragraphs: [
    "KARETELA Kusina & Bakery started with a simple dream \u2014 to bring warmth, comfort, and happiness through homemade treats.",
    "What began as a small kitchen filled with passion and a love for baking has grown into a place where tradition meets creativity. Every item we make is crafted with the finest ingredients, honest effort, and a heart for our community.",
    "From freshly baked bread to delightful pastries and custom cakes, we\u2019re here to make your special moments a little sweeter.",
  ],
};