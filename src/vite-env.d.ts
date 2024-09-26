interface ImportMetaEnv {
  readonly VITE_API: string;
  readonly VITE_IS_DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
