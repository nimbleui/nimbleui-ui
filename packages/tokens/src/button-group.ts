import type { InjectionKey, ComputedRef } from "vue";
import type { Fun } from "@yy/utils";

export type ButtonTypes = "default" | "primary" | "success" | "warning" | "info" | "error" | "dashed";

export type ButtonShape = "default" | "circle" | "round";
export type ButtonSize = "large" | "default" | "small";

type ButtonGroupContext = {
  type?: ButtonTypes | Fun<ButtonTypes>;
  shape?: ButtonShape | Fun<ButtonShape>;
  disabled?: boolean | Fun<boolean>;
  size?: ButtonSize | Fun<ButtonSize>;
  details: any;
};

export const buttonGroupContextKey: InjectionKey<ComputedRef<ButtonGroupContext>> = Symbol("buttonGroupContextKey");
