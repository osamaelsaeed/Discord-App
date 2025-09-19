import { styled } from "@mui/system";
import SideBar from "./components/SideBar/SideBar";
import FriendsSideBar from "./components/FriendsSideBar/FriendsSideBar";
import Messenger from "./components/Messenger";
import AppBar from "./components/AppBar/AppBar";
import { connectWithSocketServer } from "../../realTimeCommunication/socketConnection";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = () => {
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userDetails) {
      console.log("connecting with socket", userDetails.userDetails);
      connectWithSocketServer(userDetails.userDetails);
    } else {
      dispatch(logout());
    }
  }, [userDetails, dispatch]);
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
