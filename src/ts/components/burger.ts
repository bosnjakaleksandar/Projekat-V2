export function initBurgerMenu() {
  const burger = document.querySelector(".burger") as HTMLElement | null;
  const nav = document.querySelector(".header__list") as HTMLElement | null;
  const sidebar = document.querySelector(
    ".sidebar__list"
  ) as HTMLElement | null;
  const body = document.body;

  // Čuvamo originalni sidebar sadržaj
  const originalSidebar = sidebar ? sidebar.innerHTML : "";

  if (!burger || !nav || !sidebar) return;

  function fadeIn(element: HTMLElement, duration = 400) {
    element.style.display = "flex";
    element.style.opacity = "0";
    element.style.transition = `opacity ${duration}ms`;
    setTimeout(() => {
      element.style.opacity = "1";
    }, 10);
  }

  function fadeOut(element: HTMLElement, duration = 400) {
    element.style.opacity = "1";
    element.style.transition = `opacity ${duration}ms`;
    setTimeout(() => {
      element.style.opacity = "0";
    }, 10);
    setTimeout(() => {
      element.style.display = "none";
      element.style.transition = "";
    }, duration);
  }

  burger.addEventListener("click", () => {
    const isActive = burger.classList.toggle("active");

    if (isActive) {
      // Prebaci sidebar linkove u poseban wrapper u meniju na malim ekranima
      if (window.innerWidth <= 768 && sidebar && nav) {
        // Ukloni prethodni wrapper ako postoji
        const oldWrapper = nav.querySelector(".nav-sidebar-wrapper");
        if (oldWrapper) oldWrapper.remove();

        // Napravi novi wrapper i ubaci sidebar linkove
        const wrapper = document.createElement("div");
        wrapper.className = "nav-sidebar-wrapper";
        wrapper.innerHTML = sidebar.innerHTML;
        nav.appendChild(wrapper);

        sidebar.style.display = "none";
      }
      nav.classList.add("active");
      fadeIn(nav, 400);
      body.style.overflow = "hidden";
    } else {
      fadeOut(nav, 400);
      body.style.overflow = "";
      setTimeout(() => {
        nav.classList.remove("active");
        // Vrati sidebar linkove nazad u sidebar i očisti ih iz menija
        if (window.innerWidth <= 768 && sidebar && nav) {
          sidebar.innerHTML = originalSidebar;
          sidebar.style.display = "";
          // Ukloni wrapper iz menija
          const oldWrapper = nav.querySelector(".nav-sidebar-wrapper");
          if (oldWrapper) oldWrapper.remove();
        }
      }, 400);
    }
  });
}
