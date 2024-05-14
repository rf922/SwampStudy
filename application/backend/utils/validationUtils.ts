export const isValidPassword = (password: string) => {
  if (password.length < 8 || password.length > 16) {
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    return false;
  }
  if (!/[a-z]/.test(password)) {
    return false;
  }
  if (!/\d/.test(password)) {
    return false;
  }
  return true;
};

export const isValidName = (name: string) => {
  const nameRegex = /^[A-Za-z]{2,16}$/;
  return nameRegex.test(name);
};

export const isValidEmail = (email: string) => {
  const sfsuregex = /@sfsu\.edu$|@mail\.sfsu\.edu$/; // regex for sfsu email
  const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // regex for email validity
  if (!sfsuregex.test(String(email))) {
    return false;
  } else if (!emailRegExp.test(String(email))) {
    return false;
  } else {
    return true;
  }
};

export const isValidTextFieldEntry = (text: string) => {
  return text.length < 195;
};

export const isValidThreadTitle = (title: string) => {
  if (!title) {
    return false;
  }
  if (title.length > 64) {
    return false;
  }
  return true;
};

export const validateFields = (options: {
  firstName?: string;
  lastName?: string;
  email?: string;
  newPassword?: string;
  biography?: string;
  weekavailability?: number;
  threadTitle?: string;
  questionText?: string;
  answerText?: string;
}): boolean => {
  if (options.firstName && !isValidName(options.firstName)) return false;
  if (options.lastName && !isValidName(options.lastName)) return false;
  if (options.email && !isValidEmail(options.email)) return false;
  if (options.newPassword && !isValidPassword(options.newPassword))
    return false;
  if (options.biography && !isValidTextFieldEntry(options.biography))
    return false;
  if (options.weekavailability && options.weekavailability > 127) return false;
  if (options.threadTitle && !isValidThreadTitle(options.threadTitle))
    return false;
  if (options.questionText && !isValidTextFieldEntry(options.questionText))
    return false;
  if (options.answerText && !isValidTextFieldEntry(options.answerText))
    return false;

  return true;
};
