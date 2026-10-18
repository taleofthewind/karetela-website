import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Blurs any element with the class "scroll-blur" while the page is scrolled fast,
 * then sharpens it again when scrolling stops.
 */
export default function useScrollBlur(selector = ".scroll-blur", maxBlur = 4) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        if (!document.querySelector(selector)) return;
        // ignore slow, gentle scrolling so text stays crisp
        const speed = Math.max(Math.abs(self.getVelocity()) - 100, 0);
        const blur = Math.min(speed / 200, maxBlur);
        gsap.to(selector, { filter: `blur(${blur}px)`, duration: 0.1, overwrite: "auto" });
      },
    });

    // onUpdate stops firing when scrolling stops, so reset here or text stays blurry
    const sharpen = () => {
      if (!document.querySelector(selector)) return;
      gsap.to(selector, {
        filter: "blur(0px)",
        duration: 0.35,
        overwrite: "auto",
        onComplete: () => gsap.set(selector, { clearProps: "filter" }),
      });
    };
    ScrollTrigger.addEventListener("scrollEnd", sharpen);

    return () => {
      trigger.kill();
      ScrollTrigger.removeEventListener("scrollEnd", sharpen);
      gsap.set(selector, { clearProps: "filter" });
    };
  }, [selector, maxBlur]);
}