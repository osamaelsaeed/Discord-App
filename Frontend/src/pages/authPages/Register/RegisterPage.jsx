import { Typography, CircularProgress } from "@mui/material";
import AuthBox from "../../../components/shared/AuthBox";
import { useState, useEffect } from "react";
import RegisterPageInputs from "./components/RegisterPageInputs";
import RegisterPageFooter from "./components/RegisterPageFooter";
import { validateRegisterForm } from "../../../components/shared/utils/validators";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../features/auth/authActions";
import toast from "react-hot-toast";
const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userDetails, loading, error } = useSelector((state) => state.auth);

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(validateRegisterForm({ email, username, password }));
  }, [email, username, password]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (userDetails) {
      navigate("/dashboard");
    }
  }, [userDetails, navigate]);

  const handleRegister = () => {
    if (!isFormValid || loading) return; // prevent duplicate requests
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <AuthBox>
      <Typography
        variant="h5"
        sx={{
          color: "white",
        }}
      >
        Create an account
      </Typography>
      <RegisterPageInputs
        email={email}
        setEmail={setEmail}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <RegisterPageFooter
        isFormValid={isFormValid}
        handleRegister={handleRegister}
        loading={loading}
      />
    </AuthBox>
  );
};

export default RegisterPage;
