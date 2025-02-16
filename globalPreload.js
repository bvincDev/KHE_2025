import { bgImage } from "./titleScreen";

export function preloadGlobal(p) {
    bgImage = p.loadImage('/peter.png');
}