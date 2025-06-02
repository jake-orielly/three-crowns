import React, { useState } from "react";
import { Box } from "@mui/material";
import { resourceKeys, Resources } from "../../../game-objects/resources/types";
import { events } from "../../../events/events";
import { ResourceCount } from "./ResourceCount";

export function ResourceDisplay() {
    const [resourceCounts, setResourceCounts] = useState<Resources>();
    const [resourceCaps, setResourceCaps] = useState<Resources>();

    events.on("setPlayerResourceCounts", (resources) => {
        setResourceCounts({ ...resources });
    });
    events.on("setPlayerResourceCaps", (resourceCaps) => {
        setResourceCaps({ ...resourceCaps });
    });

    return (
        <Box>
            {resourceKeys.map((key) => {
                return (
                    <ResourceCount
                        key={key}
                        resourceName={key}
                        resourceCount={resourceCounts?.[key]}
                        resourceCap={resourceCaps?.[key]}
                    />
                );
            })}
        </Box>
    );
}
