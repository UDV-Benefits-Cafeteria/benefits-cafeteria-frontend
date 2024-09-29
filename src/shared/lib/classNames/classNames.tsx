export type TClassNames = boolean | string | undefined | null;

export const classNames = (...args: TClassNames[]): string => args.join(" ");
