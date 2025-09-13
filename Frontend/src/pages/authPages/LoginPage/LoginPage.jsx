import AuthBox from "../../../components/shared/AuthBox";
import LoginHeader from "./components/LoginHeader";
import LoginPageFooter from "./components/LoginPageFooter";
import LoginPageInputs from "./components/LoginPageInputs";
import { useState, useEffect } from "react";
import { validateLoginForm } from "../../../components/shared/utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../features/auth/authActions";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  // grab auth state from redux
  const { userDetails, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    setIsFormValid(validateLoginForm({ email, password }));
  }, [email, password]);

  // show toast on login error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // navigate on successful login
  useEffect(() => {
    if (userDetails) {
      navigate("/dashboard");
    }
  }, [userDetails, navigate]);

  const handleLogin = () => {
    if (!isFormValid || loading) return; // block duplicate requests
    dispatch(loginUser({ email, password }));
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
        isFormValid={isFormValid && !loading}
        handleLogin={handleLogin}
        loading={loading} // pass down if you want "Logging in..." text
      />
    </AuthBox>
  );
};

export default LoginPage;
