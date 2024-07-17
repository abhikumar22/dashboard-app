import TextField from "@mui/material/TextField";
import "./index.scss";

const InputField = ({
  title,
  placeholderText,
  type = "text",
  customStyleInput = {},
  customStyleLabel = {},
  customStyleInputWrapper = {},
  handleChange = () =>{}
}) => {
  const handleInputChange = (e) =>{
    handleChange(e.target.value);
  }
  return (
    <div className="Input_Wrapper" style={customStyleInputWrapper}>
      <div style={customStyleLabel} className="Input_Label">
        {title}
      </div>
      <TextField
        onChange={handleInputChange}
        id="outlined-basic"
        placeholder={placeholderText}
        variant="outlined"
        fullWidth={true}
        type={type}
        sx={{
          ...customStyleInput,
          "& .MuiInputBase-input": {
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: 600,
          },
          "& .MuiInputLabel-root": {
            fontSize: "16px",
            fontFamily: "Montserrat",
            fontWeight: 200,
          },
          "& .MuiInputBase-root": {
            borderRadius: "9px",
          },
          "& .MuiInputBase-input::placeholder": {
            fontWeight: "normal",
          },
        }}
      />
    </div>
  );
};

export default InputField;
