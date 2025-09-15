import { styled } from "@mui/system";
import SideBar from "./components/SideBar/SideBar";
import FriendsSideBar from "./components/FriendsSideBar/FriendsSideBar";
import Messenger from "./components/Messenger";
import AppBar from "./components/AppBar/AppBar";
import { useEffect } from "react";
import { logout } from "../../components/shared/utils/auth";
const Wrapper = styled("div")({
  widt: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      logout();
    }
  }, []);
  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
    </Wrapper>
  );
};

export default Dashboard;
