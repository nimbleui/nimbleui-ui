import type { InjectionKey, Ref } from "vue";
import type { Fun } from "@yy/utils";

export type ButtonTypes = "default" | "primary" | "success" | "warning" | "info" | "danger" | "dashed";

export type ButtonShape = "default" | "circle" | "round";

type ButtonGroupContext = {
  type: Ref<ButtonTypes | Fun<ButtonTypes>>;
  shape: Ref<ButtonShape | Fun<ButtonShape>>;
  disabled: Ref<boolean | Fun<boolean>>;
};

export const buttonGroupContextKey: InjectionKey<ButtonGroupContext> = Symbol("buttonGroupContextKey");
