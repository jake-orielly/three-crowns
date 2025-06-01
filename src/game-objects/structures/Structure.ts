import { Container, ContainerChild, Sprite } from "pixi.js";
import { BOARD_SQUARE_SIZE_PX } from "../consts";
import { Coords } from "../types";

export interface StructureProps {
    x: number;
    y: number;
    container: Container<ContainerChild>;
    sprite: Sprite;
}

export abstract class Structure {
    protected x: number;
    protected y: number;
    protected container: Container<ContainerChild>;
    protected sprite: Sprite;

    constructor({ x, y, container, sprite }: StructureProps) {
        this.x = x;
        this.y = y;
        this.container = container;
        this.sprite = sprite;

        sprite.width = BOARD_SQUARE_SIZE_PX;
        sprite.height = BOARD_SQUARE_SIZE_PX;
        sprite.x = BOARD_SQUARE_SIZE_PX * this.x;
        sprite.y = BOARD_SQUARE_SIZE_PX * this.y;

        this.container.addChild(this.sprite);
    }

    public getTerritoryTiles(): Coords[] {
        return [];
    }
}
