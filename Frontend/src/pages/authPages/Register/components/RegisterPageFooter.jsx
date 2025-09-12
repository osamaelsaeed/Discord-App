import CustomPrimaryButton from "../../../../components/shared/CustomPrimaryButton";
import RedirectInfo from "../../../../components/shared/RedirectInfo";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
const RegisterPageFooter = ({ handleRegister, isFormValid }) => {
  const navigate = useNavigate();
  const handlePushToLoginPage = () => {
    navigate("/login");
  };

  const getFormNotValidMessage = () => {
    return "Invalid username or email or password";
  };
  const getFormValidMessage = () => {
    return "Press to register!";
  };

  return (
    <>
      <Tooltip
        title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage()}
      >
        <div>
          <CustomPrimaryButton
            label="Register"
            additionalStyles={{ marginTop: "30px" }}
            disabled={!isFormValid}
            onClick={handleRegister}
          ></CustomPrimaryButton>
        </div>
      </Tooltip>
      <RedirectInfo
        text=""
        redirectText="Already Have an account?"
        additionalStyles={{ marginTop: "5px" }}
        redirectHandler={handlePushToLoginPage}
      />
    </>
  );
};

export default RegisterPageFooter;
