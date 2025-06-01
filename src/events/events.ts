import mitt from "mitt";
import { Resources } from "../game-objects/resources/types";

export type GameEvents = {
    selectStructure: { structure: string };
    setPlayerResourceCounts: Resources;
};

export const events = mitt<GameEvents>();
