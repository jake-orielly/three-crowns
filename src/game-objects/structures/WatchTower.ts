import { Assets, Sprite } from "pixi.js";
import { StructureProps, Structure } from "./Structure";
import { WATCH_TOWER_TEXTURE_PATH } from "../../img/filePaths";
import { getStructureTerritoryTiles } from "./utils/getStructureTerritoryTiles";

const wheatFarmTexture = await Assets.load(WATCH_TOWER_TEXTURE_PATH);

type Props = Omit<StructureProps, "sprite">;

export class WatchTower extends Structure {
    private range: number;

    constructor(props: Props) {
        const lodgeSprite = new Sprite(wheatFarmTexture);

        super({ sprite: lodgeSprite, ...props });

        this.range = 2;
    }

    public getTerritoryTiles() {
        return getStructureTerritoryTiles({
            x: this.x,
            y: this.y,
            range: this.range,
        });
    }
}
