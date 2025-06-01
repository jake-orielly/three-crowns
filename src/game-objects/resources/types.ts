export interface Resources {
    population: number;
    wheat: number;
    wood: number;
}

export type Resource = keyof Resources;
