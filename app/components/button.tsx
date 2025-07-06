import React from "react";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { SxProps, Theme } from "@mui/system";
import { ButtonProps } from "@mui/material/Button";
import { Typography } from "@mui/material";

type ButtonPresets =
  | "default"
  | "outline"
  | "outlineDarkGrey"
  | "ghost"
  | "fill"
  | "fillPrimary"
  | "disabled"
  | "fillDarkGrey"
  | "ghostDarkGrey"
  | "ghostError"
  | "warning"
  | "error";

interface DynamicButtonProps extends ButtonProps {
  preset?: ButtonPresets;
  isLoading?: boolean;
  leftAccessory?: React.ReactNode;
  rightAccessory?: React.ReactNode;
  text?: string;
  sxOverride?: SxProps<Theme>;
}

const getPresetStyles = (
  preset: ButtonPresets,
  isDisabled: boolean
): React.CSSProperties => {
  switch (preset) {
    case "outline":
      return {
        border: "1px solid",
        borderColor: isDisabled ? "grey.400" : "primary.main",
        color: isDisabled ? "grey.400" : "primary.main",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "outlineDarkGrey":
      return {
        border: "1px solid",
        borderColor: isDisabled ? "#808080" : "#323232",
        color: isDisabled ? "#808080" : "#323232",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "ghost":
      return {
        backgroundColor: "transparent",
        color: isDisabled ? "#808080" : "inherit",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "fill":
      return {
        backgroundColor: isDisabled ? "grey.400" : "primary.main",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "fillPrimary":
      return {
        backgroundColor: isDisabled ? "grey.400" : "secondary.main",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "fillDarkGrey":
      return {
        backgroundColor: isDisabled ? "#e3e3e3" : "#323232",
        color: isDisabled ? "#bfbfbf" : "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "ghostDarkGrey":
      return {
        backgroundColor: "transparent",
        color: isDisabled ? "#808080" : "inherit",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "ghostError":
      return {
        backgroundColor: "transparent",
        color: isDisabled ? "#808080" : "#C52424",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "warning":
      return {
        backgroundColor: isDisabled ? "#bfbfbf" : "#E69B17",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "error":
      return {
        backgroundColor: isDisabled ? "#bfbfbf" : "#C52424",
        color: "white",
        cursor: isDisabled ? "not-allowed" : "pointer",
      };
    case "disabled":
      return {
        backgroundColor: "grey.400",
        color: "white",
        cursor: "not-allowed",
      };
    default:
      return {};
  }
};

export const DynamicButton: React.FC<DynamicButtonProps> = ({
  preset = "default",
  isLoading = false,
  leftAccessory,
  rightAccessory,
  text,
  sxOverride,
  style,
  ...props
}) => {
  const isDisabled = props.disabled || isLoading;
  const presetStyles = getPresetStyles(preset, isDisabled);

  return (
    <Button
      {...props}
      disabled={isDisabled}
      style={{ ...presetStyles, ...style }}
      sx={{
        px: 3.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "capitalize",
        borderRadius: "50px",
        height: "40px",
        ...sxOverride,
      }}
    >
      {isLoading && <CircularProgress size={24} sx={{ marginRight: 2 }} />}
      <Typography variant="body2">{text}</Typography>
    </Button>
  );
};
