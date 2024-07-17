import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./index.scss";

const SelectComponent = ({
  title,
  placeholderText = "Select",
  customStyleLabel = {},
  options=[],
  handleChange= () =>{}
}) => {
  const [selectVal, setSelectVal] = useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setSelectVal(event.target.value as string);
    handleChange(event?.target?.value);
  };
  return (
    <div className="SelectComponent_Wrapper">
      <div style={customStyleLabel} className="SelectComponent_Label">
        {title}
      </div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}>
          <Select
          displayEmpty
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectVal}
            onChange={handleSelectChange}
            inputProps={{ "aria-label": "Without label" }}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <span style={{color:"#a8a8a8",fontFamily:'Montserrat'}}>Select</span>;
              }
              return selected;
            }}
            sx={{
              ".MuiInputBase-input": {
                  padding: "0.8em",
                },
                "MuiInputBase-root":{
                  borderRadius: "8px",
                },
                "&.root-MuiSelect-root":{
                  borderRadius:"1em"
                }
            }}
          >
            <MenuItem disabled value="">
              <em>{placeholderText}</em>
            </MenuItem>
            {options.map((currVal)=>{
              const {id,value} = currVal || {};
              return(
                <MenuItem id={id} value={value}>{id}</MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default SelectComponent;
