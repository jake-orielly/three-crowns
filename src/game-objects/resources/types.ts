export interface Resources {
    population: number;
    wheat: number;
    wood: number;
}

export type Resource = keyof Resources;
export const resourceKeys: Resource[] = ["population", "wheat", "wood"];
