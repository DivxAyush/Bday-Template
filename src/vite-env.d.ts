/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RECIPIENT_NAME?: string;
  readonly VITE_NICKNAME?: string;
  readonly VITE_SENDER_NAME?: string;
  readonly VITE_BIRTHDAY_YEAR?: string;
  readonly VITE_PREV_AGE?: string;
  readonly VITE_NEW_AGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
