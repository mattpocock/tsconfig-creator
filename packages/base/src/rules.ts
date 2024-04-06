import { Rule } from "./types.js";
import { createDefaultRule, toLowerCase } from "./utils.js";

export const forceConsistentCasingInFileNamesNotFalse: Rule = {
  check: (ctx) => {
    return (
      ctx.tsconfig.compilerOptions?.forceConsistentCasingInFileNames === false
    );
  },
  description: [
    "forceConsistentCasingInFileNames should be enabled.",
    "Since it's on by default, you should remove the setting.",
  ],
  fix: (tsconfig) => {
    delete tsconfig.compilerOptions?.forceConsistentCasingInFileNames;
  },
};

export const forceConsistentCasingInFileNamesMustNotBeDefined: Rule = {
  check: (ctx) => {
    return (
      ctx.tsconfig.compilerOptions?.forceConsistentCasingInFileNames === true
    );
  },
  description: [
    "forceConsistentCasingInFileNames should be removed.",
    "Since it's on by default, you should remove the setting.",
  ],
  fix: (tsconfig) => {
    delete tsconfig.compilerOptions?.forceConsistentCasingInFileNames;
  },
};

export const strictMustBeEnabled: Rule = createDefaultRule(
  "strict",
  true,
  "strict must be enabled.",
);

export const skipLibCheckMustBeEnabled: Rule = createDefaultRule(
  "skipLibCheck",
  true,
  "skipLibCheck must be enabled.",
);

export const moduleDetectionMustBeForce: Rule = createDefaultRule(
  "moduleDetection",
  "force",
  "moduleDetection must be set to 'force'.",
);

export const resolveJsonModuleMustBeTrue: Rule = {
  check: (ctx) => {
    return (
      ctx.tsconfig.compilerOptions?.resolveJsonModule !== true &&
      toLowerCase(ctx.tsconfig.compilerOptions?.module) !== "preserve"
    );
  },
  description: ["resolveJsonModule must be enabled."],
  fix: (tsconfig) => {
    tsconfig.compilerOptions ??= {};
    tsconfig.compilerOptions.resolveJsonModule = true;
  },
};

export const isolatedModulesMustBeEnabled: Rule = createDefaultRule(
  "isolatedModules",
  true,
  "isolatedModules must be enabled.",
);

export const allowJsMustBeEnabled: Rule = createDefaultRule(
  "allowJs",
  true,
  "allowJs must be enabled.",
);

export const esModuleInteropMustBeEnabled: Rule = {
  check: (ctx) => {
    return (
      ctx.tsconfig.compilerOptions?.esModuleInterop !== true &&
      toLowerCase(ctx.tsconfig.compilerOptions?.module) !== "preserve"
    );
  },
  description: ["esModuleInterop must be enabled."],
  fix: (tsconfig) => {
    tsconfig.compilerOptions ??= {};
    tsconfig.compilerOptions.esModuleInterop = true;
  },
};

export const targetMustBeDefined: Rule = {
  check: (ctx) => {
    return ctx.tsconfig.compilerOptions?.target === undefined;
  },
  description: [
    "target must be defined.",
    "You should specify the target version of JavaScript you are transpiling to.",
  ],
  fix: (tsconfig) => {
    tsconfig.compilerOptions ??= {};
    tsconfig.compilerOptions.target = "es2022";
  },
};

export const libMustBeDefined: Rule = {
  check: (ctx) => {
    return ctx.tsconfig.compilerOptions?.lib === undefined;
  },
  description: [
    "lib must be defined.",
    "Recommended configurations are 'es2022' for Node, and 'es2022', 'dom', 'dom.iterable' for web applications.",
  ],
  fix: (tsconfig) => {
    tsconfig.compilerOptions ??= {};
    tsconfig.compilerOptions.lib = ["es2022", "dom", "dom.iterable"];
  },
};

export const moduleMustBeDefined: Rule = {
  check: (ctx) => {
    return ctx.tsconfig.compilerOptions?.module === undefined;
  },
  description: ["module must be defined."],
};

const ALLOWED_MODULE_VALUES = ["nodenext", "node16", "preserve"];

export const moduleMustBeValid: Rule = {
  check: (ctx) => {
    return !ALLOWED_MODULE_VALUES.includes(
      toLowerCase(ctx.tsconfig.compilerOptions?.module) as string,
    );
  },
  description: [
    `module must be one of the following values: ${ALLOWED_MODULE_VALUES.join(
      ", ",
    )}.`,
  ],
};

export const moduleResolutionMustNotBeDefined: Rule = {
  check: (ctx) => {
    return ctx.tsconfig.compilerOptions?.moduleResolution !== undefined;
  },
  description: ["moduleResolution must not be defined."],
  fix: (tsconfig) => {
    delete tsconfig.compilerOptions?.moduleResolution;
  },
};

export const resolveJsonModuleNotRequiredWhenModuleSetToPreserve: Rule = {
  check: (ctx) => {
    return (
      toLowerCase(ctx.tsconfig.compilerOptions?.module) === "preserve" &&
      ctx.tsconfig.compilerOptions?.resolveJsonModule !== undefined
    );
  },
  description: [
    "resolveJsonModule is not required when module is set to 'preserve'.",
  ],
  fix: (tsconfig) => {
    delete tsconfig.compilerOptions?.resolveJsonModule;
  },
};

export const esModuleInteropNotRequiredWhenModuleSetToPreserve: Rule = {
  check: (ctx) => {
    return (
      toLowerCase(ctx.tsconfig.compilerOptions?.module) === "preserve" &&
      ctx.tsconfig.compilerOptions?.esModuleInterop !== undefined
    );
  },
  description: [
    "esModuleInterop is not required when module is set to 'preserve'.",
  ],
  fix: (tsconfig) => {
    delete tsconfig.compilerOptions?.esModuleInterop;
  },
};

export const noEmitShouldBeTrueWhenModuleSetToPreserve: Rule = {
  check: (ctx) => {
    return (
      toLowerCase(ctx.tsconfig.compilerOptions?.module) === "preserve" &&
      ctx.tsconfig.compilerOptions?.noEmit !== true
    );
  },
  description: ["noEmit should be true when module is set to 'preserve'."],
  fix: (tsconfig) => {
    (tsconfig.compilerOptions ??= {}).noEmit = true;
  },
};

export const sourceMapShouldBeTrueWhenTranspilingWithTypeScript: Rule = {
  check: (ctx) => {
    return (
      ctx.tsconfig.compilerOptions?.noEmit !== true &&
      ctx.tsconfig.compilerOptions?.sourceMap !== true
    );
  },
  description: [
    "sourceMap should be true when transpiling with TypeScript.",
    "You should enable source maps for debugging.",
  ],
  fix: (tsconfig) => {
    (tsconfig.compilerOptions ??= {}).sourceMap = true;
  },
};
