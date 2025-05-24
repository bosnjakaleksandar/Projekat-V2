import "./scss/main.scss";
import { initHeaderScrollAnimation } from "./ts/components/header";
import { initBurgerMenu } from "./ts/components/burger";
import imageOverlay from "./ts/animations/imageOverlay";
import classicalAnimations from "./ts/animations/ClassicalAnimations";

initBurgerMenu();
initHeaderScrollAnimation();
imageOverlay();
classicalAnimations();
