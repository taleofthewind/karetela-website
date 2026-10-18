import Hero from "@/components/home/Hero";
import InfoBar from "@/components/home/InfoBar";
import Marquee from "@/components/home/Marquee";
import Testimonials from "@/components/home/Testimonials";
import Mapsection from "@/components/contact/Mapsection";
import Contact from "./Contact";
import Gallery from "./Gallery";
import Featurestrip from "@/components/home/Featuresstrip";
import Menucategories from "@/components/home/Menucategories";

export default function Home() {
  return (
    <>
      <Hero />
      <Featurestrip />
      <Menucategories />
      <Gallery />
      <Testimonials />
      <Mapsection />
    </>
  );
}