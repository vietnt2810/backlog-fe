export const MESSAGES = {
  REQUIRE: (field: string) => `Please input ${field}`,
  WRONG_FORMAT: (field: string) => `${field} is not in the correct format`,
  WRONG_PASSWORD_FORMAT: () =>
    `Your password must be a combination of alphanumeric characters of 8-32 character`,
};
