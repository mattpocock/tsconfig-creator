export type Context = {
  tsconfig: TSConfig;
};

export type TSConfig = {
  compilerOptions?: Record<string, unknown>;
};

export type Rule = {
  check: (ctx: Context) => boolean;
  description: string | string[];
  fix?: (tsconfig: TSConfig) => void;
};
