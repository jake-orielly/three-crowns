import { events } from "../../events/events";
import { Resource, Resources } from "./types";

export class FactionResources {
    private resourceCounts: Resources;
    private resourceCaps: Resources;

    constructor() {
        this.resourceCounts = {
            population: 0,
            wheat: 0,
            wood: 0,
        };
        this.resourceCaps = {
            population: 10,
            wheat: 30,
            wood: 30,
        };
        events.emit("setPlayerResourceCaps", this.resourceCaps);
    }

    public getResourceCounts() {
        return this.resourceCounts;
    }

    public getResourceCaps() {
        return this.resourceCaps;
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

        const oldAmount = this.resourceCounts[resource];
        const newAmount = Math.min(
            oldAmount + amountToAdd,
            this.resourceCaps[resource]
        );
        this.resourceCounts[resource] = newAmount;
    }

    public setResourceCap({
        resource,
        amount,
    }: {
        resource: Resource;
        amount: number;
    }) {
        this.resourceCaps[resource] = amount;
    }
}
