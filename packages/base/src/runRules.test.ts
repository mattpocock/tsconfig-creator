import { expect, it } from "vitest";
import {
  checkRules,
  getFailedRules,
  getFixedTSConfig,
  getOutput,
} from "./runRules.js";
import * as rules from "./rules.js";

it("REPL", () => {
  const result = checkRules(rules, {
    tsconfig: {
      compilerOptions: {
        forceConsistentCasingInFileNames: false,
      },
    },
  });

  expect(result.forceConsistentCasingInFileNamesMustNotBeDefined).toBe(false);
  expect(result.forceConsistentCasingInFileNamesNotFalse).toBe(true);
});

it("REPL", () => {
  const result = checkRules(rules, {
    tsconfig: {
      compilerOptions: {},
    },
  });

  expect(result.forceConsistentCasingInFileNamesMustNotBeDefined).toBe(false);
  expect(result.forceConsistentCasingInFileNamesNotFalse).toBe(false);
});

it("REPL", () => {
  const result = checkRules(rules, {
    tsconfig: {
      compilerOptions: {
        forceConsistentCasingInFileNames: true,
      },
    },
  });

  expect(result.forceConsistentCasingInFileNamesMustNotBeDefined).toBe(true);
  expect(result.forceConsistentCasingInFileNamesNotFalse).toBe(false);
});

it("REPL", () => {
  const result = checkRules(rules, {
    tsconfig: {
      compilerOptions: {
        strict: false,
      },
    },
  });

  expect(result.strictMustBeEnabled).toBe(true);
});

it("REPL", () => {
  const result = checkRules(rules, {
    tsconfig: {
      compilerOptions: {},
    },
  });

  expect(result.strictMustBeEnabled).toBe(true);
});

it("REPL", () => {
  const result = getOutput(rules, {
    tsconfig: {
      compilerOptions: {
        strict: true,
        skipLibCheck: true,
        moduleDetection: "force",
        isolatedModules: true,
        allowJs: true,
        module: "preserve",
        target: "es2022",
        lib: ["es2022"],
      },
    },
  });

  expect(result).toMatchInlineSnapshot(`
    [
      "noEmit should be true when module is set to 'preserve'.",
      "sourceMap should be true when transpiling with TypeScript.
    You should enable source maps for debugging.",
    ]
  `);
});

it("REPL", () => {
  const result = getFixedTSConfig(rules, {
    tsconfig: {
      compilerOptions: {
        module: "NodeNext",
        noEmit: true,
      },
    },
  });

  expect(result).toMatchInlineSnapshot(`
    {
      "compilerOptions": {
        "allowJs": true,
        "esModuleInterop": true,
        "isolatedModules": true,
        "lib": [
          "es2022",
          "dom",
          "dom.iterable",
        ],
        "module": "NodeNext",
        "moduleDetection": "force",
        "noEmit": true,
        "resolveJsonModule": true,
        "skipLibCheck": true,
        "strict": true,
        "target": "es2022",
      },
    }
  `);
});
