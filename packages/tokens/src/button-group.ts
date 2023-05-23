import type { InjectionKey, ComputedRef } from "vue";
import type { Fun } from "@yy/utils";

export type ButtonTypes = "default" | "primary" | "success" | "warning" | "info" | "danger" | "dashed";

export type ButtonShape = "default" | "circle" | "round";

type ButtonGroupContext = {
  type?: ButtonTypes | Fun<ButtonTypes>;
  shape?: ButtonShape | Fun<ButtonShape>;
  disabled?: boolean | Fun<boolean>;
  details: any;
};

export const buttonGroupContextKey: InjectionKey<ComputedRef<ButtonGroupContext>> = Symbol("buttonGroupContextKey");
