import { Coords } from "../types";

export function getMapCoords({ x, y }: Coords) {
    return `${y}:${x}`;
}

export function decodeMapCoords(key: string): Coords {
    const [y, x] = key.split(":").map(Number);
    return { x, y };
}
