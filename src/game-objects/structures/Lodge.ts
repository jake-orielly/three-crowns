import { Assets, Sprite } from "pixi.js";
import { StructureProps, Structure } from "./Structure";
import { LODGE_TEXTURE_PATH } from "../../img/filePaths";
import { getStructureTerritoryTiles } from "./utils/getStructureTerritoryTiles";

type LodgeProps = Omit<StructureProps, "sprite">;

const lodgeTexture = await Assets.load(LODGE_TEXTURE_PATH);

export class Lodge extends Structure {
    private range: number;

    constructor(props: LodgeProps) {
        const lodgeSprite = new Sprite(lodgeTexture);

        super({ sprite: lodgeSprite, ...props });
        this.range = 3;
    }

    public getTerritoryTiles() {
        return getStructureTerritoryTiles({
            x: this.x,
            y: this.y,
            range: this.range,
        });
    }
}
