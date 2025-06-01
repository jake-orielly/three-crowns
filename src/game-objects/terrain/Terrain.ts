import { Color, Container, ContainerChild, Sprite } from "pixi.js";
import { TERRAIN_TYPE_TEXTURE_MAP } from "./terrainTypeTextureMap";
import { BOARD_SQUARE_SIZE_PX } from "../consts";

export type TerrainType = "plains" | "forrest";

interface ConstructorProps {
    type: TerrainType;
    x: number;
    y: number;
    container: Container<ContainerChild>;
}

export class Terrain {
    private type: TerrainType;
    private x: number;
    private y: number;
    private container: Container;
    private sprite: Sprite;

    constructor({ type, x, y, container }: ConstructorProps) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.container = container;

        const tileTexture = TERRAIN_TYPE_TEXTURE_MAP[type];
        const terrainSprite = new Sprite(tileTexture);
        terrainSprite.x = x * BOARD_SQUARE_SIZE_PX;
        terrainSprite.y = y * BOARD_SQUARE_SIZE_PX;
        terrainSprite.width = BOARD_SQUARE_SIZE_PX;
        terrainSprite.height = BOARD_SQUARE_SIZE_PX;
        this.sprite = terrainSprite;

        this.container.addChild(terrainSprite);
    }

    public setTerrainType(type: TerrainType) {
        this.type = type;
        const tileTexture = TERRAIN_TYPE_TEXTURE_MAP[type];
        this.sprite.texture = tileTexture;
    }

    public setTerrainTint(tint: Color) {
        this.sprite.tint = tint;
    }

    public getType() {
        return this.type;
    }
}
