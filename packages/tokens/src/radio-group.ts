import type { InjectionKey, Ref } from "vue";

type radioGroupContext = {
  modelValue: Ref<string | number | boolean | undefined>;
  onChange: (value: string | number | boolean) => void;
};

export const radioGroupContextKey: InjectionKey<radioGroupContext> = Symbol("radioGroupContextKey");
