import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ types, type, handleChange }) {
  

  

  return (
    <Box
      sx={{ width: 400 }}
      style={{ margin: 15, backgroundColor: "white", borderRadius: 5 }}
    >
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Generos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem key={'vacio'} value={''}>
              Todos Los Generos
            </MenuItem>
          {types.map((items, index) => (
            <MenuItem key={index} value={items.id}>
              {items.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
