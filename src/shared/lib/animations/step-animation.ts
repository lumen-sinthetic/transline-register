import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export function useStepAnimation<T extends HTMLElement = HTMLElement>(
  currentStep: number,
  activeStep: number
) {
  const elementRef = useRef<T>(null);

  const isActive = currentStep === activeStep;

  const tlRef = useRef<GSAPTimeline>(null);

  useLayoutEffect(() => {
    if (!tlRef.current && elementRef.current) {
      const tl = gsap
        .timeline({ paused: true })
        .from(elementRef.current, { display: "none", duration: 0.1 })
        .from(elementRef.current, { opacity: 0, duration: 0.5 });

      tlRef.current = tl;
    }

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useLayoutEffect(() => {
    // if (isFirstRender.current) {
    //   if (isActive) {
    //     gsap.set(elementRef.current, { clearProps: "all" });
    //   } else {
    //     gsap.set(elementRef.current, { opacity: 0, display: "none" });
    //   }
    //   isFirstRender.current = false;
    //   return;
    // }

    if (isActive) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [isActive]);

  return elementRef;
}
