import { Typography } from "@mui/material";
import AuthBox from "../../../components/shared/AuthBox";
import { useState, useEffect } from "react";
import RegisterPageInputs from "./components/RegisterPageInputs";
import RegisterPageFooter from "./components/RegisterPageFooter";
import { validateRegisterForm } from "../../../components/shared/utils/validators";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(validateRegisterForm({ email, username, password }));
  }, [email, username, password, setIsFormValid]);
  const handleRegister = () => {
    console.log("works regi");
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
      />
    </AuthBox>
  );
};

export default RegisterPage;
