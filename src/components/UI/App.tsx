import React from "react";
import { Box, Button } from "@mui/material";
import { events } from "../../events/events";
import { ResourceDisplay } from "./ResourceDisplay";

export default function App() {
    function selectStructure(structure: string) {
        events.emit("selectStructure", { structure });
    }

    return (
        <Box>
            <ResourceDisplay />
            <Button
                onClick={() => {
                    selectStructure("wheatFarm");
                }}
            >
                Wheat Farm
            </Button>

            <Button
                onClick={() => {
                    selectStructure("watchTower");
                }}
            >
                Watch Tower
            </Button>
        </Box>
    );
}
