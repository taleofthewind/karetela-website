/*
  PLACEHOLDER feedback. Replace with REAL customer comments (ask permission first).
  - avatar / photo are optional file names inside  src/assets/images/testimonials/
    If a file is missing, the card shows initials / no photo, and nothing breaks.
  - rating is optional. Leave it out unless the review really came with a star rating.
*/
const files = import.meta.glob("@/assets/images/testimonials/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

const img = (name) => {
  if (!name) return null;
  const key = Object.keys(files).find((k) => k.endsWith(`/${name}`));
  return key ? files[key] : null;
};

export const testimonialsBg = img("bg.jpg") || img("bg.webp") || img("bg.png");

export const testimonials = [
  {
    id: 1,
    name: "Karl",
    role: "Local Customer",
    rating: 5,
    quote:
      "The pastries here are always fresh and delicious! My family loves the ensaymada and the ube cake. Highly recommended!",
    avatar: img("karl.jpg"),
    photo: img("bread.jpg"),
  },
  {
    id: 2,
    name: "Filipina",
    role: "Local Customer",
    rating: 5,
    quote:
      "KARETELA never disappoints! Their bread is soft, the meals are flavorful, and the staff are so friendly. Our go-to bakery from now on!",
    avatar: img("filipina.jpg"),
    photo: img("bread.jpg"),
  },
  {
    id: 3,
    name: "Patrick",
    role: "Local Customer",
    rating: 5,
    quote:
      "I ordered their chocolate croissant and it was absolutely amazing! Flaky, buttery, and just the right amount of sweetness.",
    avatar: img("patrick.jpg"),
    photo: img("bread.jpg"),
  },
  {
    id: 4,
    name: "Richard",
    role: "Local Customer",
    rating: 5,
    quote:
      "The food is always consistent and the prices are reasonable. KARETELA really brings the taste of home. Keep up the great work!",
    avatar: img("richard.jpg"),
    photo: img("bread.jpg"),
  },
  {
    id: 5,
    name: "Patricia",
    role: "Local Customer",
    rating: 5,
    quote:
      "The food is always consistent and the prices are reasonable. KARETELA really brings the taste of home. Keep up the great work!",
    avatar: img("pat.jpg"),
    photo: img("bread.jpg"),
  },
    {
    id: 6,
    name: "Sheila",
    role: "Local Customer",
    rating: 5,
    quote:
      "The food is always consistent and the prices are reasonable. KARETELA really brings the taste of home. Keep up the great work!",
    avatar: img("sheila.jpg"),
    photo: img("bread.jpg"),
  },
];