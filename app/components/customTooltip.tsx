import React from "react";
import { Tooltip, TooltipProps } from "@mui/material";
import { styled } from "@mui/system";

// Define a styled component for the tooltip
export const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "#323232",
    padding: "15px",
    color: "white",
    borderRadius: "12px",

    [`& .MuiTooltip-arrow`]: {
      color: "#323232",
    },
  },
}));
