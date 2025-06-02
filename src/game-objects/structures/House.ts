import { Assets, Sprite } from "pixi.js";
import { StructureProps, Structure } from "./Structure";
import { STRUCTURES_DIRECTORY } from "../../img/filePaths";

const houseTexture = await Assets.load(`${STRUCTURES_DIRECTORY}/house.png`);

type Props = Omit<StructureProps, "sprite">;

export class House extends Structure {
    constructor(props: Props) {
        const lodgeSprite = new Sprite(houseTexture);

        super({ sprite: lodgeSprite, ...props });
    }
}
