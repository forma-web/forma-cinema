import { RuleExpression } from "vee-validate";

export type TInputProps = {
  label?: string;
  name: string;
  rules?: RuleExpression<string>;
};
