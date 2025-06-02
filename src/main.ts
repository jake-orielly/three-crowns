import ReactDOM from "react-dom/client";
import App from "./components/UI/App";
import { Board } from "./game-objects/Board";
import { BOARD_SQUARE_SIZE_PX } from "./game-objects/consts";
import { WatchTower } from "./game-objects/structures/WatchTower";
import { WheatFarm } from "./game-objects/structures/WheatFarm";
import { House } from "./game-objects/structures/House";
import { createApp } from "./utils/createApp";
import { createContainer } from "./utils/createContainer";
import { events } from "./events/events";
import { Structure } from "./game-objects/structures/Structure";
import { FactionResources } from "./game-objects/resources/FactionResources";
import { addAppTicker } from "./utils/addAppTicker";

(async () => {
    const app = await createApp();
    const container = createContainer(app);

    let activeStructure: (new (...args: any[]) => Structure) | undefined;

    container.on("pointertap", (event) => {
        const x = Math.floor(event.globalX / BOARD_SQUARE_SIZE_PX);
        const y = Math.floor(event.globalY / BOARD_SQUARE_SIZE_PX);
        const coords = {
            x,
            y,
        };

        const clickedStructureType = board.getStructureType(coords);
        const clickedTerrainType = board.getTerrainType(coords);
        const isInTerritory = board.isInTerritory({ x, y });

        const validStructureLocation =
            clickedStructureType === undefined &&
            clickedTerrainType === "plains" &&
            isInTerritory;

        if (validStructureLocation && activeStructure) {
            board.addStructure({
                x,
                y,
                structure: activeStructure,
            });
        }
    });

    events.on("selectStructure", ({ structure }) => {
        if (structure === "wheatFarm") {
            activeStructure = WheatFarm;
        } else if (structure === "watchTower") {
            activeStructure = WatchTower;
        } else if (structure === "house") {
            activeStructure = House;
        }
    });

    const board = new Board(container);
    await board.createBoard();

    addAppTicker({
        app,
        tickCallback: (args) => {
            board.gameTick(args);
        },
    });
})();

const rootElement = document.getElementById("app")!;
const root = ReactDOM.createRoot(rootElement);
root.render(App());
