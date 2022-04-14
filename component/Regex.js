export const validEmail = new RegExp(
  "^(?=.{6,20}$)[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,19}[a-zA-Z0-9]$"
);
export const validPassword = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);
export const validFname = new RegExp(
  "^[a-zA-Z]{1,10}$"
);
export const validLname = new RegExp(
  "^[a-zA-Z]{1,10}$"
);
export const ValidUsername = new RegExp(
  "^[a-zA-Z0-9]+$"
);
export const ValidPhno = new RegExp(
  "^[0-9()-]{10}$"
);
export const ValidAddress = new RegExp(
  "^[a-zA-Z0-9_ .-]{1,50}$"
);

export const ValidEmailAddress = new RegExp(
  "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
);