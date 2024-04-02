export const isValidEmail = (email, errors) => {
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegExp.test(String(email))) {
    errors.push("invalid email");
  }
  /* expand for sfsu email etc,  */
};

/**
 * password validation util takes array of errors and pushes field specific error msgs
 * @param  password
 * @param  errors
 */
export const isValidPassword = (password, errors) => {
  if (password.length < 8 || password.length > 16) {
    errors.push("Contain 8 to 16 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Contain at least 1 uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Contain at least 1 lowercase letter");
  }
  if (!/\d/.test(password)) {
    errors.push("Contain at least 1 number");
  }
};

export const isValidName = (name, errors) => {
  const nameRegex = /^[A-Za-z]{2,16}$/; // alpha betwen 2 , 16
  const numberRegex = /\d/; // num

  if (numberRegex.test(name)) {
    // no nums in field
    errors.push("must not contain numbers");
  }

  if (!nameRegex.test(name)) {
    // alpha length check
    errors.push("Must have between 2 and 16 letters");
  }
};

export const isValidConfirmPassword = (password, confirmPassword, errors) => {
  if (password !== confirmPassword) {
    errors.push("password and confirm password must match");
  }
};
