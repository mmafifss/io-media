import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";

export default function DropdownPaginate(props: SelectProps) {
  const dropdownStyle = {
    borderRadius: "3.125rem",
    width: "100%",
  };

  return (
    <FormControl size="small">
      <Select
        {...props}
        sx={dropdownStyle}
        inputProps={{
          name: "paginate",
        }}
      >
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </FormControl>
  );
}
