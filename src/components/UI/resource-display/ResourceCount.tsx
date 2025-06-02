import { Typography } from "@mui/material";
import React from "react";

interface Props {
    resourceName: string;
    resourceCount?: number;
    resourceCap?: number;
}

export function ResourceCount({
    resourceName,
    resourceCount = 0,
    resourceCap = 0,
}: Props) {
    return (
        <Typography id={`${resourceName}-count`}>
            {resourceName}: {Math.floor(resourceCount)}/{resourceCap}
        </Typography>
    );
}
