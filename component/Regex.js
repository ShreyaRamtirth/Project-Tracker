export const validEmail = new RegExp(
  "^(?=.{6,20}$)[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,19}[a-zA-Z0-9]$"
);
export const validPassword = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);
