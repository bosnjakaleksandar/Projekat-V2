import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const animateElements = () => {
  // From right animations
  document.querySelectorAll(".js-from-right").forEach((el) => {
    gsap.set(el, { opacity: 0, x: 30 });
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: false,
      },
      opacity: 1,
      x: 0,
      duration: 0.7,
    });
  });

  // From left animations
  document.querySelectorAll(".js-from-left").forEach((el) => {
    gsap.set(el, { opacity: 0, x: -30 });
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: false,
      },
      opacity: 1,
      x: 0,
      duration: 0.7,
    });
  });

  // From up animations
  document.querySelectorAll(".js-from-up").forEach((el) => {
    gsap.set(el, { opacity: 0, y: -50 });
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: false,
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
    });
  });

  // Rotate animations
  document.querySelectorAll(".js-rotate").forEach((el) => {
    gsap.set(el, { opacity: 0, rotate: 0 });
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: false,
      },
      opacity: 1,
      rotate: 720, // Dva puna kruga
      duration: 2,
      ease: "power1.inOut",
    });
  });

  // from down timeline
  document.querySelectorAll(".timeline-block-down").forEach((block) => {
    const elements = Array.from(block.querySelectorAll(".js-from-down-tl"));
    const rows: Record<number, Element[]> = {};

    elements.forEach((el) => {
      const top = (el as HTMLElement).offsetTop;
      if (!rows[top]) rows[top] = [];
      rows[top].push(el);
    });

    Object.values(rows).forEach((row) => {
      gsap.set(row, { opacity: 0, y: 50 });
      gsap.to(row, {
        scrollTrigger: {
          trigger: row[0],
          start: "top 80%",
          once: false,
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: {
          each: 0.2,
          onComplete: (targets: Element[]) => {
            (targets[0] as HTMLElement).style.transform = "";
          },
        },
      });
    });
  });

  // from up timeline
  document.querySelectorAll(".timeline-block").forEach((block) => {
    const elements = block.querySelectorAll(".js-from-up-tl");
    gsap.set(elements, { opacity: 0, y: -50 });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        once: false,
      },
    });
    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: "power1.inOut",
    })
      .to(
        elements,
        {
          opacity: 0.5,
          duration: 0.5,
          stagger: 0.2,
          ease: "power1.inOut",
        },
        "+=0.5"
      )
      .to(elements, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power1.inOut",
      });
  });
};

// Social SVG Animation
const animateSocialSvg = () => {
  const svgObject = document.querySelector(
    ".social__image"
  ) as HTMLObjectElement | null;
  if (!svgObject) return;

  const runAnimation = () => {
    const svgDoc = svgObject.contentDocument;
    if (!svgDoc) return;

    const elements = svgDoc.querySelectorAll("path, circle, rect, g");
    gsap.set(elements, { opacity: 0 });

    gsap.to(elements, {
      scrollTrigger: {
        trigger: ".social__container",
        start: "top 80%",
        once: false,
      },
      opacity: 1,
      duration: 0.5,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  };

  if (svgObject.contentDocument) {
    runAnimation();
  } else {
    svgObject.onload = runAnimation;
  }
};

const classicalAnimations = () => {
  animateElements();
  animateSocialSvg();
};

export default classicalAnimations;
