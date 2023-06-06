import type { InjectionKey } from "vue";
import type { ProvideContext } from "./types";
import type { CheckboxGroupProps } from "@yy/components/checkbox-group";

type CheckboxGroupContext = ProvideContext<{ props: CheckboxGroupProps }>;

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol("checkboxGroupContextKey");
