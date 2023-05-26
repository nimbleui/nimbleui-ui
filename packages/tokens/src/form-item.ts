import type { InjectionKey } from "vue";
import type { ProvideContext, TriggerEventType } from "./types";
import type { FormItemProps } from "@yy/components";

type FormItemContext = ProvideContext<{
  props: FormItemProps;
  events: (type: TriggerEventType, value: string | number) => void;
}>;

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContext");
