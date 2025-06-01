import { Color, Container, ContainerChild } from "pixi.js";
import { BOARD_HEIGHT, BOARD_WIDTH } from "./consts";
import { Lodge } from "./structures/Lodge";
import { Structure } from "./structures/Structure";
import { decodeMapCoords, getMapCoords } from "./utils/getMapCoords";
import { Terrain, TerrainType } from "./terrain/Terrain";
import { Coords } from "./types";
import { COLORS } from "../consts";
import { countBy } from "lodash";

type coords = string;

export class Board {
    private container: Container<ContainerChild>;
    private structures: Record<coords, Structure>;
    private terrain: Record<coords, Terrain>;
    private territory: Record<coords, string>;
    private activeCity: Lodge | undefined;

    constructor(container: Container<ContainerChild>) {
        this.container = container;
        this.structures = {};
        this.terrain = {};
        this.territory = {};
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

        const lodge = this.addLodge(lodgeCoords);

        this.activeCity = lodge;
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
        this.updateTerritory();

        return newStructure;
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
