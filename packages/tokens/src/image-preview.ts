import type { InjectionKey } from "vue";

interface ImagePreviewContext {
  isGroup?: boolean;
  toggle: (bool: boolean) => void;
  setPreviewSrc: (src: string) => void;
}

export const imagePreviewContextKey: InjectionKey<ImagePreviewContext> = Symbol("imagePreviewContext");
