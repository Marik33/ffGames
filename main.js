import { clearCanvas, makeCanvasFullScreen } from "./canvas.js";
import { SpaceShip } from "./FighterPlane.js";

makeCanvasFullScreen();

window.addEventListener("resize", () => {
    makeCanvasFullScreen();
});

const plane = new FighterPlane();

plane.image.onload = () => {
    plane.draw();
    gameLoop();
};

function gameLoop() {
    clearCanvas();
    ship.update();
    ship.draw();
    requestAnimationFrame(gameLoop);
}    