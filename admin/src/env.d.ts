interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY?: string;
  [key: string]: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
