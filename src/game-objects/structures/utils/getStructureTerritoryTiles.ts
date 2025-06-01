import { Coords } from "../../types";
import { getDistance } from "../../utils/getDistance";
import { decodeMapCoords, getMapCoords } from "../../utils/getMapCoords";

interface Props extends Coords {
    range: number;
}
export function getStructureTerritoryTiles({ x, y, range }: Props): Coords[] {
    const tiles: Record<string, number> = {};
    const origin = getMapCoords({ x, y });
    const tilesToCheck = [origin];

    let currentTile = tilesToCheck.shift();

    while (currentTile) {
        const coords = decodeMapCoords(currentTile);
        const distance = getDistance({
            start: {
                x,
                y,
            },
            end: coords,
        });
        tiles[currentTile] = distance;

        if (distance < range) {
            const { x, y } = coords;
            const adjacentTiles = [
                getMapCoords({ x: x + 1, y }),
                getMapCoords({ x: x - 1, y }),
                getMapCoords({ x, y: y + 1 }),
                getMapCoords({ x, y: y - 1 }),
            ];
            tilesToCheck.push(
                ...adjacentTiles.filter((tile) => tiles[tile] === undefined)
            );
        }

        currentTile = tilesToCheck.shift();
    }

    return Object.keys(tiles).map(decodeMapCoords);
}
