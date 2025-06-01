import { Application, Renderer } from "pixi.js";
import { BOARD_HEIGHT_PX, BOARD_WIDTH_PX } from "../game-objects/consts";

export async function createApp(): Promise<Application<Renderer>> {
    const app = new Application();
    await app.init({
        background: "#1099bb",
        width: BOARD_WIDTH_PX,
        height: BOARD_HEIGHT_PX,
    });
    document.body.appendChild(app.canvas);

    return app;
}
