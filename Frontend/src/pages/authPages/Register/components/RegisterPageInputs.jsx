import Input from "../../../../components/shared/Input";

const RegisterPageInputs = ({
  email,
  setEmail,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <>
      <Input
        value={email}
        setValue={setEmail}
        label="Email address"
        type="text"
        placeholder="Enter email address"
      />
      <Input
        value={username}
        setValue={setUsername}
        label="Username"
        type="text"
        placeholder="Enter username"
      />
      <Input
        value={password}
        setValue={setPassword}
        label="Password"
        type="password"
        placeholder="Enter password"
      />
    </>
  );
};

export default RegisterPageInputs;
