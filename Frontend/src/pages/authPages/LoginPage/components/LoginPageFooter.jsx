import CustomPrimaryButton from "../../../../components/shared/CustomPrimaryButton";
import RedirectInfo from "../../../../components/shared/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
const LoginPageFooter = ({ handleLogin, isFormValid, loading }) => {
  const navigate = useNavigate();
  const handlePushToRegisterPage = () => {
    navigate("/register");
  };

  const getFormNotValidMessage = () => {
    return "Enter correct e-mail address and password should contains between 6-30 characters";
  };
  const getFormValidMessage = () => {
    return "Press to log in!";
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="LogIn"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleLogin}
            loading={loading}
          ></CustomPrimaryButton>
        </div>
      </Tooltip>
      <RedirectInfo
        text="Need an account?"
        redirectText="Create an account"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToRegisterPage}
      />
    </>
  );
};

export default LoginPageFooter;
