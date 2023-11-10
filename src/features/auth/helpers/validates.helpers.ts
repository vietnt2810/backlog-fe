import { Rule } from "antd/es/form";

import { getMessage } from "@/utils/utils";

const SIX_DIGIT_REGEX = /^\d{6}$/;

export const codeRules = (): Rule[] => {
  return [
    {
      pattern: SIX_DIGIT_REGEX,
      message: getMessage("MSG0014"),
    },
  ];
};
