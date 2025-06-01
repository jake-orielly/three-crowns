import { Assets, Sprite } from "pixi.js";
import { StructureProps, Structure } from "./Structure";
import { WHEAT_FARM_TEXTURE_PATH } from "../../img/filePaths";

const wheatFarmTexture = await Assets.load(WHEAT_FARM_TEXTURE_PATH);

type Props = Omit<StructureProps, "sprite">;

export class WheatFarm extends Structure {
    constructor(props: Props) {
        const lodgeSprite = new Sprite(wheatFarmTexture);

        super({ sprite: lodgeSprite, ...props });
    }
}
