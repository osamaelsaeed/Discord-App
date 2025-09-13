import { styled } from "@mui/material";
import MainPageButton from "./MainPageButton";
const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});
const SideBar = () => {
  return (
    <MainContainer>
      <MainPageButton />
    </MainContainer>
  );
};

export default SideBar;
