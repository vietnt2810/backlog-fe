import { Rule } from "antd/es/form";

import { getMessage } from "@/utils/utils";

const EMAIL_REGEX =
  /^[^.\W](?!.*\.\.)[a-zA-Z0-9._+-/]{1,64}@[a-zA-Z0-9-.]+(\.[a-zA-Z]{2,}){1}$/g;

const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,32}$/;

const NUMBER_REGEX = /^[0-9]*$/;

export const requiredRules = (field: string): Rule[] => {
  return [
    {
      required: true,
      whitespace: true,
      message: getMessage("MSG0001", field),
    },
  ];
};

export const emailRules = (field: string): Rule[] => {
  return [
    {
      pattern: EMAIL_REGEX,
      message: getMessage("MSG0002", field),
    },
  ];
};

export const passwordRules = (): Rule[] => [
  {
    pattern: PASSWORD_REGEX,
    message: getMessage("MSG0013"),
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
