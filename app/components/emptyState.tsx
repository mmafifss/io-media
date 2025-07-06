import React, { ReactNode } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

interface IEmptyState {
  image: string;
  title: string;
  message: string;
  action?: ReactNode;
  widthImage: any | undefined;
  heightImage: any | undefined;
}

const EmptyState = (props: IEmptyState) => {
  const { image, title, message, action, widthImage, heightImage } = props;
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p={3}
    >
      <Image
        src={image}
        alt="empty state"
        width={widthImage}
        height={heightImage}
      />
      <Box mt={3} maxWidth={470}>
        <Typography variant="subtitle1" color="initial" mb={1}>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="initial" fontWeight={300}>
          {message}
        </Typography>
      </Box>
      {action}
    </Box>
  );
};

export default EmptyState;
