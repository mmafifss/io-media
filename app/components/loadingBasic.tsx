import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import React from "react";

export const LoadingBasic = ({ isLoading }: any) => {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
