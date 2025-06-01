import { Application, Renderer, Container } from "pixi.js";

export function createContainer(app: Application<Renderer>): Container {
    const container = new Container();
    container.interactive = true;

    app.stage.addChild(container);

    return container;
}
