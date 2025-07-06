"use client";

import { useState } from "react";
import {
  OutlinedInput,
  InputAdornment,
  OutlinedInputProps,
} from "@mui/material";
import { Control, useController } from "react-hook-form";
import { RemoveRedEye } from "@mui/icons-material";

type OutlineInputProps = OutlinedInputProps & {
  control: Control<any, any>;
  errorText?: string;
};

export const PasswordField = (props: OutlineInputProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const {
    control,
    name = "",
    defaultValue = "",
    errorText,
    ...restProps
  } = props;

  const { field } = useController({ name, control, defaultValue });

  return (
    <OutlinedInput
      {...restProps}
      {...field}
      label=""
      type={isVisible ? "text" : "password"}
      sx={{
        marginTop: "5px",
        height: "40px",
        borderRadius: "7px",
        width: "100%",
        "& .MuiInputBase-root": {
          height: "40px",
          borderRadius: "7px",
        },
        "& .MuiInputBase-input": {
          height: "40px",
          padding: "0 14px",
        },
      }}
      endAdornment={
        <InputAdornment position="end">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <RemoveRedEye /> : <RemoveRedEye />}
          </span>
        </InputAdornment>
      }
    />
  );
};
