import { Resource, Resources } from "./types";

export class FactionResources {
    private resouceCounts: Resources;

    constructor() {
        this.resouceCounts = {
            population: 0,
            wheat: 0,
            wood: 0,
        };
    }

    public getResourceCounts() {
        return this.resouceCounts;
    }

    public updateResourceCount({
        resource,
        baseAmount,
        multipliers = [],
    }: {
        resource: Resource;
        baseAmount: number;
        multipliers?: number[];
    }) {
        let amountToAdd = baseAmount ?? 0;

        for (const mult of multipliers) {
            amountToAdd *= mult;
        }

        this.resouceCounts[resource] += amountToAdd;
    }
}
