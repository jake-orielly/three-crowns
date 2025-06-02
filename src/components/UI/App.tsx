import React from "react";
import { Box, Button } from "@mui/material";
import { events } from "../../events/events";
import { ResourceDisplay } from "./resource-display";

export default function App() {
    function selectStructure(structure: string) {
        events.emit("selectStructure", { structure });
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="flex-start">
            <Box mr={4}>
                <ResourceDisplay />
            </Box>
            <Box id="game-board-container" textAlign="center" />
            <Box display="flex" flexDirection="column" gap={1} ml={4}>
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
                <Button
                    onClick={() => {
                        selectStructure("house");
                    }}
                >
                    House
                </Button>
            </Box>
        </Box>
    );
}
