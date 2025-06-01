import { Coords } from "../types";

interface Args {
    start: Coords;
    end: Coords;
}

export function getDistance({ start, end }: Args) {
    const xDiff = Math.abs(start.x - end.x);
    const yDiff = Math.abs(start.y - end.y);
    return xDiff + yDiff;
}
