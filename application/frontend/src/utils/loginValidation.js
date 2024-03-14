export const isValidEmail = (email) => {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // todo check sfsu-email
  return emailRegExp.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const isValid = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  return password.length >= 8;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!isValidPassword(password)) {
    errors.password = "invalid email or Password";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
