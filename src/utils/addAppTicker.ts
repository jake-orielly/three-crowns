import { Application, Renderer } from "pixi.js";

const ONE_SECOND = 1000;
const TICK_INTERVAL = 100;

interface Props {
    app: Application<Renderer>;
    tickCallback: ({ secondFraction }: { secondFraction: number }) => void;
}

export function addAppTicker({ app, tickCallback }: Props) {
    let elapsed: number = 0;

    app.ticker.add(({ elapsedMS }) => {
        elapsed += elapsedMS;
        if (elapsed >= TICK_INTERVAL) {
            elapsed -= TICK_INTERVAL;
            tickCallback({
                secondFraction: TICK_INTERVAL / ONE_SECOND,
            });
        }
    });
}
