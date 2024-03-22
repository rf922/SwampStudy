export const isValidEmail = (email) => {
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegExp.test(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  const passwdRegex = /^[a-zA-Z0-9]{6,}$/;
  return passwdRegex.test(password) && password.length < 64;
};

export const isValidName = (name) => {
  const nameRegex = /^[A-Za-z]{2,}$/;
  return nameRegex.test(String(name).toLowerCase());
};

export const isValidConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
