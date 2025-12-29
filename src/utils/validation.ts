const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,24}$/;

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return passwordRegex.test(password);
};

export const EMAIL_REGEX = emailRegex;
export const PASSWORD_REGEX = passwordRegex;
