/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // add other VITE_* vars you use:
  readonly VITE_SOME_FLAG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}