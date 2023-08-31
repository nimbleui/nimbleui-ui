import type { InjectionKey, Ref } from "vue";
import type { ProvideContext } from "./types";
import type { CheckboxGroupProps } from "@nimble-ui/components/checkbox-group";

type CheckboxGroupContext = ProvideContext<{
  props: CheckboxGroupProps;
  model: Ref<Array<string | number> | undefined>;
  change: (checked: boolean, uid?: number) => void;
}>;

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> = Symbol("checkboxGroupContextKey");
