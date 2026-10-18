import Hero from "@/components/home/Hero";
import InfoBar from "@/components/home/InfoBar";
import Marquee from "@/components/home/Marquee";
import Testimonials from "@/components/home/Testimonials";
import MapSection from "@/components/contact/MapSection";
import Contact from "./Contact";
import Gallery from "./Gallery";
import FeaturesStrip from "@/components/home/FeaturesStrip";
import MenuCategories from "@/components/home/Menucategories";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesStrip />
      <MenuCategories />
      <Gallery />
      <Testimonials />
      <MapSection />
    </>
  );
}