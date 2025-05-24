export function initHeaderScrollAnimation() {
  let lastScrollY = window.scrollY;
  const header = document.querySelector("header") as HTMLElement | null;

  function handleHeaderScroll() {
    if (!header) return;
    const currentScrollY = window.scrollY;

    if (currentScrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      header.style.transform = "translateY(-100%)";
      header.style.transition = "transform 0.3s ease";
    } else {
      header.style.transform = "translateY(0)";
      header.style.transition = "transform 0.3s ease";
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener("scroll", handleHeaderScroll);
}
