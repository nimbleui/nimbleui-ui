import type { InjectionKey, ComputedRef } from "vue";
import type { ProvideContext, TriggerEventType } from "./types";
import type { FormItemProps } from "@yy/components";

export interface FormItemState {
  status: "failed" | "passed" | "init";
  message: string;
  focus: boolean;
}

type FormItemContext = ProvideContext<{
  state: FormItemState;
  props: FormItemProps;
  details: ComputedRef<any>;
  events: (type: TriggerEventType, value: string | number | boolean) => void;
}>;

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContext");
