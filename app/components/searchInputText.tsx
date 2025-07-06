import React from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

export const SearchInputText = (
  {
    icon,
    message,
    fullwidth,
    placeholder,
    onChange,
    onKeyDown,
    onClick,
    width,
    style,
    value,
  }: any,
  props: any
) => {
  return (
    <TextField
      {...props}
      id="filled-start-adornment"
      sx={{
        "& .MuiInputBase-root": {
          bgcolor: "#E3E3E3",
          height: "40px",
          fontSize: "14px",
          borderRadius: "50px",
          minWidth: message ? "255px" : "424px",
          border: "none",
          width: width,
        },
        "&.MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.MuiFormControl-root": {
          width: fullwidth ? "100%" : null,
        },
        "& .MuiInputBase-input": {
          height: "40px",
          padding: "0 14px",
        },
      }}
      style={style}
      fullWidth={fullwidth}
      onClick={onClick}
      placeholder={placeholder}
      onChange={onChange}
      onKeyDown={onKeyDown}
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
        endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
      }}
    />
  );
};
