import React from "react";
import { Box, CircularProgress, Stack } from "@mui/material";

export const LoadingPage = ({ isDetail }: any) => {
  const detailPageStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "90vw",
  };

  const defaultAnimation = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  const word = "Just a moment...";

  return (
    <Stack style={detailPageStyle}>
      <CircularProgress color="inherit" />
      <span aria-hidden style={{ marginTop: "20px" }}>
        {word.split("").map((char, charIndex) => (
          <span key={`${char}-${charIndex}`} className="inline-block">
            {char}
          </span>
        ))}
      </span>
    </Stack>
  );
};
