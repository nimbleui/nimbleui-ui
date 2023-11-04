import type { InjectionKey, ComputedRef } from "vue";
import type { ProvideContext, TriggerEventType } from "./types";

export interface FormItemState {
  status: "failed" | "passed" | "init";
  message: string;
  focus: boolean;
}

type FormItemContext = ProvideContext<{
  state: FormItemState;
  propsRef: ComputedRef<{ details?: any }>;
  events: (type: TriggerEventType, value: string | number | boolean) => void;
}>;

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContext");
