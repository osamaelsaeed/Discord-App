import Input from "../../../../components/shared/Input";
const LoginPageInputs = ({ email, setEmail, password, setPassword }) => {
  return (
    <>
      <Input
        value={email}
        setValue={setEmail}
        label="E-mail"
        type="text"
        placeholder="Enter e-mail address"
      ></Input>
      <Input
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      ></Input>
    </>
  );
};

export default LoginPageInputs;
