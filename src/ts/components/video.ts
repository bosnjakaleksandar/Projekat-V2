const video = () => {
  document.addEventListener("DOMContentLoaded", () => {
    const wrappers = document.querySelectorAll<HTMLElement>(
      ".video-wrapper--upload"
    );

    wrappers.forEach((wrapper) => {
      const video = wrapper.querySelector<HTMLVideoElement>("video");
      const playBtn = wrapper.querySelector<HTMLButtonElement>(
        ".video-wrapper__play-button"
      );

      if (!video || !playBtn) return;

      let hideControlsTimeout: number;
      let hasBeenPlayed = false;
      const updateButtonIcon = (): void => {
        if (!playBtn) return;
        playBtn.classList.toggle(
          "video-wrapper__play-button--paused",
          video.paused
        );
        playBtn.classList.toggle(
          "video-wrapper__play-button--playing",
          !video.paused
        );
        wrapper.classList.toggle("video-is-paused", video.paused);
        wrapper.classList.toggle("video-is-playing", !video.paused);
      };

      const showAndResetTimer = (): void => {
        if (!playBtn) return;
        playBtn.style.opacity = "1";
        playBtn.style.pointerEvents = "auto";
        clearTimeout(hideControlsTimeout);
        if (!video.paused) {
          startAutoHideTimer();
        }
        wrapper.classList.toggle("video-is-paused", video.paused);
        wrapper.classList.toggle("video-is-playing", !video.paused);
      };

      const startAutoHideTimer = (): void => {
        clearTimeout(hideControlsTimeout);
        if (!video.paused) {
          hideControlsTimeout = window.setTimeout(() => {
            if (!playBtn) return;
            playBtn.style.opacity = "0";
            playBtn.style.pointerEvents = "none";
          }, 200);
        }
      };

      playBtn.addEventListener("click", () => {
        if (!video.controls) {
          video.controls = true;
        }
        if (video.paused) {
          video.play().catch((error) => console.error("Play failed:", error));
        } else {
          video.pause();
        }
      });

      video.addEventListener("play", () => {
        video.controls = true;

        if (!hasBeenPlayed) {
          hasBeenPlayed = true;
          wrapper.classList.remove("show-initial-overlay");
        }

        updateButtonIcon();
        wrapper.classList.remove("video-is-paused");
        wrapper.classList.add("video-is-playing");
        startAutoHideTimer();
      });

      video.addEventListener("pause", () => {
        updateButtonIcon();
        wrapper.classList.add("video-is-paused");
        wrapper.classList.remove("video-is-playing");
        showAndResetTimer();
      });

      video.addEventListener("ended", () => {
        updateButtonIcon();
        wrapper.classList.add("video-is-paused");
        wrapper.classList.remove("video-is-playing");
        showAndResetTimer();
      });

      wrapper.addEventListener("mousemove", () => {
        showAndResetTimer();
      });

      wrapper.addEventListener("mouseleave", () => {
        if (!video.paused) {
          startAutoHideTimer();
        }
      });

      video.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });

      updateButtonIcon();
      showAndResetTimer();
      wrapper.classList.add("video-is-paused");
      wrapper.classList.add("show-initial-overlay");

      video.setAttribute("tabindex", "-1");
    });
  });
};

export default video;
