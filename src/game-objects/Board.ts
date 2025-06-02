import { Color, Container, ContainerChild } from "pixi.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./consts";
import { Lodge } from "./structures/Lodge";
import { Structure } from "./structures/Structure";
import { decodeMapCoords, getMapCoords } from "./utils/getMapCoords";
import { Terrain, TerrainType } from "./terrain/Terrain";
import { Coords } from "./types";
import { COLORS } from "../consts";
import { countBy } from "lodash";
import { storageStructures, territoryStructures } from "./structures/types";
import { FactionResources } from "./resources/FactionResources";
import { events } from "../events/events";

type coords = string;

export class Board {
    private container: Container<ContainerChild>;
    private structures: Record<coords, Structure>;
    private terrain: Record<coords, Terrain>;
    private factionResources: Record<string, FactionResources>;

    constructor(container: Container<ContainerChild>) {
        this.container = container;
        this.structures = {};
        this.terrain = {};

        const playerResources = new FactionResources();
        this.factionResources = {
            player: playerResources,
        };
    }

    public gameTick({ secondFraction }: { secondFraction: number }) {
        const structuresByType = this.countStructuresByType();
        this.factionResources.player?.updateResourceCount({
            resource: "wheat",
            baseAmount: structuresByType["WheatFarm"],
            multipliers: [secondFraction],
        });
        events.emit(
            "setPlayerResourceCounts",
            this.factionResources.player.getResourceCounts()
        );
    }

    public async createBoard() {
        for (let y = 0; y < BOARD_HEIGHT; y++) {
            for (let x = 0; x < BOARD_WIDTH; x++) {
                const terrainType = Math.random() > 0.3 ? "plains" : "forrest";
                const newTerrain = new Terrain({
                    type: terrainType,
                    x,
                    y,
                    container: this.container,
                });
                this.terrain[getMapCoords({ y, x })] = newTerrain;
            }
        }

        const lodgeX = 5;
        const lodgeY = 5;
        const lodgeCoords = {
            x: lodgeX,
            y: lodgeY,
        };

        this.setTerrainType({
            ...lodgeCoords,
            type: "plains",
        });

        this.addLodge(lodgeCoords);
    }

    public getStructureType(args: {
        x: number;
        y: number;
    }): string | undefined {
        const terrainMapCoords = getMapCoords(args);
        return this.structures[terrainMapCoords]?.constructor.name;
    }

    public countStructuresByType() {
        return countBy(
            Object.values(this.structures),
            (structure) => structure.constructor.name
        );
    }

    public addLodge(args: Coords): Lodge {
        const lodge = this.addStructure({ ...args, structure: Lodge }) as Lodge;
        return lodge;
    }

    public updateTerritory() {
        for (const tile of this.getTerritoryTiles()) {
            const coords = decodeMapCoords(tile);
            this.setTerrainTint({
                ...coords,
                tint: COLORS.RED,
            });
        }
    }

    public addStructure(args: {
        x: number;
        y: number;
        structure: new (...args: any[]) => Structure;
    }): Structure {
        const { structure, ...coords } = args;
        const terrainMapCoords = getMapCoords(coords);
        const newStructure = new structure({
            ...coords,
            container: this.container,
        });
        this.structures[terrainMapCoords] = newStructure;
        if (territoryStructures.includes(structure.name)) {
            this.updateTerritory();
        }
        if (storageStructures.includes(structure.name)) {
            this.updateResourceCaps();
        }

        return newStructure;
    }

    public updateResourceCaps() {
        const structureCounts = countBy(
            Object.values(this.structures),
            (structure) => structure.constructor.name
        );

        const houseCount = structureCounts["House"] ?? 0;
        const lodgeCount = structureCounts["Lodge"] ?? 0;

        const playerResources = this.factionResources.player;

        playerResources.setResourceCap({
            resource: "population",
            amount: lodgeCount * 10 + houseCount * 5,
        });

        events.emit(
            "setPlayerResourceCaps",
            playerResources?.getResourceCaps()
        );
    }

    public getTerrainType(args: Coords): TerrainType {
        const terrainMapCoords = getMapCoords(args);
        return this.terrain[terrainMapCoords].getType();
    }

    public setTerrainType(args: { x: number; y: number; type: TerrainType }) {
        const { type, ...coords } = args;
        const terrainMapCoords = getMapCoords(coords);
        this.terrain[terrainMapCoords].setTerrainType(type);
    }

    public setTerrainTint(args: { x: number; y: number; tint: Color }) {
        const { tint, ...coords } = args;
        const terrainMapCoords = getMapCoords(coords);
        const terrainTile = this.terrain[terrainMapCoords];
        if (terrainTile) {
            terrainTile.setTerrainTint(tint);
        }
    }

    public isInTerritory(args: Coords) {
        const coordsKey = getMapCoords(args);
        const territory = this.getTerritoryTiles();
        return territory.has(coordsKey);
    }

    public getTerritoryTiles(): Set<string> {
        const territoryTiles: Coords[] = [];
        const structures = Object.values(this.structures);
        for (const structure of structures) {
            territoryTiles.push(...structure.getTerritoryTiles());
        }
        return new Set(territoryTiles.map(getMapCoords));
    }
}
