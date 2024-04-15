export const isValidEmail = (email, errors) => {
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@sfsu\.edu$/;
  if (!emailRegExp.test(String(email))) {
    errors.push("Invalid email.");
  }
  /* expand for other email domains */
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

export const isValidTextFieldEntry = (textEntry, errors) => {
  if (textEntry.length > 195) {
    errors.push("Text Entry must be less than 196 characters.");
  }
};

export const isValidThreadTitle = (title, errors) => {
  if (!title) {
    errors.push("Title must not be empty .");
  }
  if (title.length > 64) {
    errors.push("Title Length must be less than 65 characters");
  }
};

export const isValidName = (name, errors) => {
  const nameRegex = /^[A-Za-z]{2,16}$/; // alpha betwen 2 , 16

  if (!nameRegex.test(name)) {
    // If name doesn't match the regex, add an error
    errors.push(
      "Must have between 2 and 16 letters with no spaces or special characters",
    );
  }
};

export const isValidConfirmPassword = (password, confirmPassword, errors) => {
  if (password !== confirmPassword) {
    errors.push("password and confirm password must match");
  }
};
