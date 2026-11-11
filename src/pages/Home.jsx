import Hero from "@/components/home/Hero";
import Testimonials from "@/components/home/Testimonials";
import Mapsection from "@/components/contact/Mapsection";
import Gallery from "./Gallery";
import Featurestrip from "@/components/home/Featuresstrip";
import Menucategories from "@/components/home/Menucategories";
import Ourstory from "@/components/home/Ourstory";
import Drinks from "@/components/home/Drinks"

export default function Home() {
  return (
    <>
      <Hero />
      <Featurestrip />
      <Menucategories />
      <Drinks />
      <Gallery />
      <Testimonials />
      <Ourstory />
      <Mapsection />
    </>
  );
}