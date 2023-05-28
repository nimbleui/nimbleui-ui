import type { InjectionKey } from "vue";
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
  events: (type: TriggerEventType, value: string | number) => void;
}>;

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContext");
