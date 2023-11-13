import { Rule } from "antd/es/form";

import { MESSAGES } from "@/messages/messages";
import { getMessage } from "@/utils/utils";

const EMAIL_REGEX =
  /^[^.\W](?!.*\.\.)[a-zA-Z0-9._+-/]{1,64}@[a-zA-Z0-9-.]+(\.[a-zA-Z]{2,}){1}$/g;

const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z]).*[A-Za-z\d]{8,32}$/;

const NUMBER_REGEX = /^[0-9]*$/;

export const requiredRules = (field: string): Rule[] => {
  return [
    {
      required: true,
      whitespace: true,
      message: MESSAGES.REQUIRE(field),
    },
  ];
};

export const emailRules = (field: string): Rule[] => {
  return [
    {
      pattern: EMAIL_REGEX,
      message: MESSAGES.WRONG_FORMAT(field),
    },
  ];
};

export const passwordRules = (): Rule[] => [
  {
    pattern: PASSWORD_REGEX,
    message: MESSAGES.WRONG_PASSWORD_FORMAT(),
  },
];

export const confirmPassword = (dependencyField: string): Rule[] => {
  return [
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue(dependencyField) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error(getMessage("MSG0012")));
      },
    }),
  ];
};

export const numberRules = (field: string): Rule[] => {
  return [
    {
      pattern: NUMBER_REGEX,
      message: getMessage("MSG0002", field),
    },
  ];
};
