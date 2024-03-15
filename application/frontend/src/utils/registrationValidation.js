export const isValidName = (name) => {
  const isValid = /^[A-Za-z]{2,}$/; // valid names start from two - ex first name "Ni"
  return isValid.test(String(name).toLowerCase());
};

export const isValidConfirmPassword = (password, confirmPassword) => {
  console.log(password + " " + confirmPassword);
  return password === confirmPassword;
};

export const isValidEmail = (email) => {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  // todo check sfsu-email .sfsu.edu .mail.sfsu.edu
  return emailRegExp.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const passwdRegex = /^[a-zA-Z0-9]{6,}$/; // min 6 char alphanum
  return passwdRegex.test(password) && password.length < 64;
};

export const validateRegistrationForm = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => {
  const errors = {};

  if (!isValidName(firstName)) {
    errors.firstName = "Invalid First Name";
  }
  if (!isValidName(lastName)) {
    errors.lastName = "Invalid Last Name";
  }
  if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!isValidPassword(password)) {
    errors.password = "Invalid Password";
  }

  if (!isValidConfirmPassword(password, confirmPassword)) {
    errors.confirmPassword = "Password and confirm Password must match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
