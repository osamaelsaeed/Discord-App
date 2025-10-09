import { styled } from "@mui/system";

const Seprator = styled("div")({
  width: "95%",
  backgroundColor: "#b9bbbe",
  height: "1px",
  position: "relative",
  marginTop: "20px",
  marginBottom: "10px",
});

const DateLabel = styled("span")({
  backgroundColor: "#36393f",
  position: "absolute",
  left: "45%",
  top: "-10px",
  color: "#b9bbbe",
  padding: "0 5px",
  fontSize: "14px",
});
const DateSeprator = ({ date }) => {
  return (
    <Seprator>
      <DateLabel>{date}</DateLabel>
    </Seprator>
  );
};

export default DateSeprator;
