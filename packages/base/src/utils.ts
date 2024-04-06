import { Rule } from "./types.js";

export const createDefaultRule = (
  ruleKey: string,
  defaultValue: unknown,
  description: string | string[],
): Rule => {
  return {
    check: (ctx) => {
      return ctx.tsconfig.compilerOptions?.[ruleKey] !== defaultValue;
    },
    description,
    fix: (tsconfig) => {
      tsconfig.compilerOptions ??= {};
      tsconfig.compilerOptions[ruleKey] = defaultValue;
    },
  };
};

export const toLowerCase = (str: unknown) => {
  if (typeof str !== "string") {
    return str;
  }

  return str.toLowerCase();
};

export const resolveDescription = (description: string | string[]): string => {
  if (Array.isArray(description)) {
    return description.join("\n");
  }

  return description;
};
