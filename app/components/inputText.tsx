"use client";

import { TextField, TextFieldProps } from "@mui/material";
import { Control, useController } from "react-hook-form";

type InputTextProps = TextFieldProps & {
  control: Control<any, any>;
  errorText?: string;
};

export const InputText = (props: InputTextProps) => {
  const {
    control,
    name = "",
    defaultValue = "",
    errorText,
    ...restProps
  } = props;

  const { field } = useController({ name, control, defaultValue });

  return (
    <TextField
      inputProps={{
        sx: {
          "&::placeholder": {
            fontSize: "14px",
          },
        },
      }}
      helperText={errorText}
      {...restProps}
      {...field}
      sx={{
        "& .MuiInputBase-root": {
          height: "40px",
          borderRadius: "7px",
          "&.Mui-disabled": {
            backgroundColor: "#efefef",
            color: "#efefef",
          },
        },
        "& .MuiInputBase-input": {
          height: "40px",
          padding: "0 14px",
        },
        "& .MuiFormHelperText-root": {
          color: "#E34747",
          marginTop: "6px",
          marginLeft: 0,
          "&.Mui-disabled": {
            color: "#E34747", // Maintain red color when disabled
          },
        },
      }}
    />
  );
};
