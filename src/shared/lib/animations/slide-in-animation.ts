import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function useSlideInAnimation<T extends HTMLElement = HTMLElement>(
  visible: boolean,
  direction: "left" | "right"
) {
  const elementRef = useRef<T>(null);
  const tlRef = useRef<GSAPTimeline>(null);
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (!tlRef.current && elementRef.current) {
      const tl = gsap
        .timeline({ paused: true })
        .fromTo(
          elementRef.current,
          { x: direction === "left" ? "-100%" : "100%" },
          { x: 0, duration: 0.3, ease: "power2.inOut" }
        );

      tlRef.current = tl;

      if (visible && isFirstRender.current) {
        gsap.set(elementRef.current, { x: 0 });
        tl.progress(1); // Set timeline to end state
      }
    }

    return () => {
      tlRef.current?.kill();
    };
  }, [direction]);

  useLayoutEffect(() => {
    if (!tlRef.current) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (visible) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [visible]);

  return elementRef;
}
