export const validateLoginForm = ({ email, password }) => {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  return isEmailValid && isPasswordValid;
};

export const validateRegisterForm = ({ email, username, password }) => {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = validatePassword(password);
  const isUsernameValid = validateUsername(username);
  return isEmailValid && isPasswordValid && isUsernameValid;
};

export const validatePassword = (password) => {
  return password.length >= 8 && password.length <= 30;
};
export const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 12;
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
