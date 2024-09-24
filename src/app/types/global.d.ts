declare const __API__: string;
declare const __IS_DEV__: boolean;
type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T;
};
