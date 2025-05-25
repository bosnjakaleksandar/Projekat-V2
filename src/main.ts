import "./scss/main.scss";
import { initHeaderScrollAnimation } from "./ts/components/header";
import { initBurgerMenu } from "./ts/components/burger";
import imageOverlay from "./ts/animations/imageOverlay";
import classicalAnimations from "./ts/animations/ClassicalAnimations";
import svgAnimations from "./ts/animations/svgAnimations";
import video from "./ts/components/video";

initBurgerMenu();
initHeaderScrollAnimation();
imageOverlay();
classicalAnimations();
svgAnimations();
video();
