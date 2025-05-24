const imageOverlay = (): void => {
  const heroImageWrappers: NodeListOf<HTMLElement> =
    document.querySelectorAll(".image-wrapper");

  if (heroImageWrappers.length === 0) return;

  const animateOverlays = (wrapper: HTMLElement): void => {
    const overlays = Array.from(
      wrapper.querySelectorAll(".image-overlay")
    ).sort((a, b) => {
      const aNum = parseInt(a.className.match(/overlay--(\d+)/)?.[1] || "0");
      const bNum = parseInt(b.className.match(/overlay--(\d+)/)?.[1] || "0");
      return bNum - aNum;
    });

    if (overlays.length === 0) return;

    overlays.forEach((overlay, index) => {
      const delay = 100 + index * 150;

      setTimeout(() => {
        (overlay as HTMLElement).style.transition =
          "transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
        (overlay as HTMLElement).style.transform = "scaleX(0)";
      }, delay);
    });
  };

  const observer: IntersectionObserver = new IntersectionObserver(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          const wrapper = entry.target as HTMLElement;

          const images = wrapper.querySelectorAll("img");
          let allImagesLoaded = true;

          images.forEach((img) => {
            if (!img.complete) {
              allImagesLoaded = false;
            }
          });

          if (allImagesLoaded) {
            animateOverlays(wrapper);
          } else {
            const imageLoadPromises = Array.from(images).map((img) => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              });
            });

            Promise.all(imageLoadPromises).then(() => {
              animateOverlays(wrapper);
            });
          }

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px",
    }
  );

  heroImageWrappers.forEach((wrapper: HTMLElement) => {
    observer.observe(wrapper);
  });
};

export default imageOverlay;
