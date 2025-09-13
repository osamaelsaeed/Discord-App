import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
const CustomPrimaryButton = ({
  label,
  additionalStyles,
  disabled,
  onClick,
  loading,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#5865F2",
        color: "white",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: "500",
        width: "100%",
        height: "40px",
      }}
      style={additionalStyles ? additionalStyles : {}}
      disabled={disabled}
      onClick={onClick}
    >
      {loading ? <CircularProgress size={22} sx={{ color: "white" }} /> : label}
    </Button>
  );
};

export default CustomPrimaryButton;
