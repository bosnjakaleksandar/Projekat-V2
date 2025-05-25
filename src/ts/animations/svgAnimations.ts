import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Social SVG Animation
const animateSocialSvg = () => {
  const svgObject = document.querySelector(
    ".social__image"
  ) as HTMLObjectElement | null;
  if (!svgObject) return;

  const runAnimation = () => {
    const svgDoc = svgObject.contentDocument;
    if (!svgDoc) return;
    const groups = svgDoc.querySelectorAll("path, g");
    if (!groups.length) return;

    gsap.set(groups, { opacity: 0, y: 20 });

    gsap.to(groups, {
      scrollTrigger: {
        trigger: ".social__container",
        start: "top 50%",
        once: true,
        onEnter: () => {
          ScrollTrigger.refresh();
        },
      },
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power2.out",
    });
  };

  const checkAndRunAnimation = () => {
    if (svgObject.contentDocument?.readyState === "complete") {
      runAnimation();
    } else {
      setTimeout(checkAndRunAnimation, 100);
    }
  };

  if (svgObject.contentDocument?.readyState === "complete") {
    setTimeout(runAnimation, 100);
  } else {
    svgObject.addEventListener("load", () => {
      setTimeout(runAnimation, 100);
    });

    setTimeout(checkAndRunAnimation, 500);
  }
};

// Circles SVG Animation
const animateCirclesSvg = (selector: string) => {
  const svgObjects = document.querySelectorAll(
    `[class*='${selector}']`
  ) as NodeListOf<HTMLObjectElement>;

  if (!svgObjects.length) return;

  svgObjects.forEach((svgObject) => {
    const runAnimation = () => {
      const svgDoc = svgObject.contentDocument;
      if (!svgDoc) return;
      const paths = svgDoc.querySelectorAll("path");
      if (!paths.length) return;

      const triggerElement = svgObject;

      paths.forEach((path) => {
        gsap.set(path, {
          transformOrigin: "center center",
          opacity: 0,
          scale: 0.8,
        });
      });

      gsap.to(paths, {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top 80%",
          once: true,
        },
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(paths, {
            scale: 1.1,
            duration: 1,
            stagger: 0.1,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          });
        },
      });
    };

    const checkAndRunAnimation = () => {
      if (svgObject.contentDocument?.readyState === "complete") {
        runAnimation();
      } else {
        setTimeout(checkAndRunAnimation, 100);
      }
    };

    if (svgObject.contentDocument?.readyState === "complete") {
      setTimeout(runAnimation, 100);
    } else {
      svgObject.addEventListener("load", () => {
        setTimeout(runAnimation, 100);
      });

      setTimeout(checkAndRunAnimation, 500);
    }
  });
};

const svgAnimations = () => {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      setTimeout(() => {
        animateSocialSvg();
        animateCirclesSvg("left-circles");
        animateCirclesSvg("right-circles");
      }, 200);
    });
  } else {
    setTimeout(() => {
      animateSocialSvg();
      animateCirclesSvg("left-circles");
      animateCirclesSvg("right-circles");
    }, 200);
  }
};

export default svgAnimations;
