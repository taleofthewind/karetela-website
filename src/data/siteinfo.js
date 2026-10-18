// Edit your details here once, and the whole site updates.
const addressText = "Galvan Street, Dagupan City, Philippines 2400";

export const siteInfo = {
  name: "Karetela Kusina & Bakery",
  address: ["Galvan Street, Dagupan City,", "Philippines 2400"],
  hours: [
    { days: "Monday - Friday", time: "9:00am - 10pm" },
    { days: "Saturday - Sunday", time: "10:00am - 10pm" },
  ],

  // TODO: replace these placeholders with the real ones
  phone: "0900 000 0000",
  email: "hello@karetela.com",
  orderFormUrl: "https://forms.google.com/",
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
  },

  // Google Maps (no API key needed)
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(addressText)}&output=embed`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addressText)}`,

  // TODO: replace with the real story (short paragraphs read best)
  story: [
    "Lorem ipsum dolor sit amet consectetur adipiscing elit id magna temporibus sed autem ad ut mollitia nobis vel molestias non et temporibus voluptate velit et illum.",
    "Adipiscing officia ullamco consequatur ea omnis aliquip tempore mollit voluptatum maxime id rerum ea iusto dolore tempor ullamco ad est nam occaecat aute.",
  ],
  socials: {
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/profile.php?id=61590859327133",
  tiktok: "https://www.tiktok.com/",   // add this, then use the real link
}
};