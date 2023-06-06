import type { InjectionKey } from "vue";
import type { ProvideContext } from "./types";
import type { CheckboxGroupProps } from "@yy/components/checkbox-group";

type CheckboxGroupContext = ProvideContext<{
  props: CheckboxGroupProps;
  change: (checked: boolean, uid?: number) => void;
}>;

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol("checkboxGroupContextKey");
