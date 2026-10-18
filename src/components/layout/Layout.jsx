import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useScrollBlur from "@/hooks/useScrollBlur";
import "./Layout.css";

export default function Layout() {
  const { pathname } = useLocation();

  // Blur effect on anything with className="scroll-blur"
  useScrollBlur(".scroll-blur", 4);

  // New page = start at the top, and re-measure scroll animations
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}