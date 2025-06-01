import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Resources } from "../../game-objects/resources/types";
import { events } from "../../events/events";

export function ResourceDisplay() {
    const [resourceCounts, setResourceCounts] = useState<Resources>();
    events.on("setPlayerResourceCounts", (resources) => {
        setResourceCounts({ ...resources });
    });

    return (
        <Box>
            <Typography>
                Population: {Math.floor(resourceCounts?.population ?? 0)}
            </Typography>
            <Typography>
                Wheat: {Math.floor(resourceCounts?.wheat ?? 0)}
            </Typography>
            <Typography>
                Wood: {Math.floor(resourceCounts?.wood ?? 0)}
            </Typography>
        </Box>
    );
}
