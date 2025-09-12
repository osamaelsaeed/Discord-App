import AuthBox from "../../../components/shared/AuthBox";
import LoginHeader from "./components/LoginHeader";
import LoginPageFooter from "./components/LoginPageFooter";
import LoginPageInputs from "./components/LoginPageInputs";
import { useState, useEffect } from "react";
import { validateLoginForm } from "../../../components/shared/utils/validators";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password, setIsFormValid]);
  const handleLogin = () => {
    console.log("works login");
  };
  return (
    <AuthBox>
      <LoginHeader />
      <LoginPageInputs
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
      <LoginPageFooter
        isFormValid={isFormValid}
        handleLogin={handleLogin}
      ></LoginPageFooter>
    </AuthBox>
  );
};

export default LoginPage;
