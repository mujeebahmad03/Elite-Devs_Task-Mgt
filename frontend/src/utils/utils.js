export const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isPasswordValid = (password) => {
  return password.length >= 8 && /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/.test(password);
};
