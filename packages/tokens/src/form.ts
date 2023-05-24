import type { ComponentInternalInstance, InjectionKey } from "vue";
import type { Fun } from "@yy/utils";

export type TriggerEventType = "onBlur" | "onChange" | "onSubmit" | "onFocus";

interface FormContext {
  disabled?: Fun<boolean> | boolean;
  link: (child: ComponentInternalInstance | null) => void;
  unLink: (child: ComponentInternalInstance | null) => void;
}

export const formContextKey: InjectionKey<FormContext> = Symbol("formContextKey");
