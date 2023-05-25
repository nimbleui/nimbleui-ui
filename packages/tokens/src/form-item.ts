import type { InjectionKey } from "vue";
import type { ProvideContext } from "./types";
import type { FormItemProps } from "@yy/components";

type FormItemContext = ProvideContext<{
  events: (type: string, value: string | number) => void;
  props: FormItemProps;
}>;

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol("formItemContext");
