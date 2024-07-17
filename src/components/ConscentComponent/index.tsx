import Checkbox from "@mui/material/Checkbox";
import "./index.scss";
import { useEffect, useState } from "react";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const ConscentComponent = ({ title = "", customStyle = {}, handleChange=()=>{} }) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = () => setChecked((prev) => !prev);
  useEffect(() => {
    handleChange(isChecked);
  }, [isChecked]);
  return (
    <div className="ConscentComponent_Wrapper" style={customStyle}>
      <Checkbox
        onChange={handleCheckboxChange}
        checked={isChecked}
        {...label}
        sx={{
          color: "grey",
          "&.Mui-checked": {
            color: "#45ABD9",
          },
          "&.MuiCheckbox-root": {
            padding: "0px",
          },
        }}
      />
      <div className="ConscentComponent_Label">{title}</div>
    </div>
  );
};

export default ConscentComponent;
