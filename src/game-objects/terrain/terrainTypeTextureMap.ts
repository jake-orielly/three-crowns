import { Assets, Texture } from "pixi.js";
import { PLAINS_TEXTURE_PATH, FORREST_TEXTURE_PATH } from "../../img/filePaths";
import { TerrainType } from "./Terrain";

const plainsTileTexture = await Assets.load(PLAINS_TEXTURE_PATH);
const forrestTileTexture = await Assets.load(FORREST_TEXTURE_PATH);

export const TERRAIN_TYPE_TEXTURE_MAP: Record<TerrainType, Texture> = {
    plains: plainsTileTexture,
    forrest: forrestTileTexture,
};
