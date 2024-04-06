import { Context, Rule } from "./types.js";
import { resolveDescription } from "./utils.js";

export const checkRules = <TRule extends Record<string, Rule>>(
  rules: TRule,
  ctx: Context,
) => {
  const rulesResult = {} as Record<keyof TRule, boolean>;

  for (const key in rules) {
    const failed = rules[key]!.check(ctx);
    rulesResult[key] = failed;
  }

  return rulesResult;
};

export const getFailedRules = <TRule extends Record<string, Rule>>(
  rules: TRule,
  ctx: Context,
) => {
  const keys: string[] = [];

  for (const key in rules) {
    const failed = rules[key]!.check(ctx);

    if (failed) {
      keys.push(key);
    }
  }

  return keys;
};

export const getOutput = <TRule extends Record<string, Rule>>(
  rules: TRule,
  ctx: Context,
) => {
  const messages: string[] = [];

  for (const key in rules) {
    const rule = rules[key]!;

    const failed = rule.check(ctx);

    if (failed) {
      messages.push(`${resolveDescription(rule.description)}`);
    }
  }

  return messages;
};

export const getFixedTSConfig = <TRule extends Record<string, Rule>>(
  rules: TRule,
  ctx: Context,
) => {
  const config = { ...ctx.tsconfig };

  for (const key in rules) {
    const rule = rules[key]!;

    const failed = rule.check(ctx);

    if (failed && rule.fix) {
      rule.fix(config);
    }
  }

  return config;
};
