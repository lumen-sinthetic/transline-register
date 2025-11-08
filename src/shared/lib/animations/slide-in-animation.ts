import gsap from "gsap";
import { useEffect, useRef } from "react";

export function useSlideInAnimation<T extends HTMLElement = HTMLElement>(
  visible: boolean,
  direction: "left" | "right"
) {
  const elementRef = useRef<T>(null);
  const tlRef = useRef<GSAPTimeline>(null);

  useEffect(() => {
    if (!tlRef.current && elementRef.current) {
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(
          elementRef.current,
          { x: direction === "left" ? "-100%" : "100%" },
          { x: 0, duration: 0.3, ease: "power2.inOut" }
        );

      tlRef.current = tl;
    }

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;

    // TODO: Fix animation first play

    if (visible) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [visible]);

  return elementRef;
}
