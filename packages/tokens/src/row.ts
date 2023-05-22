import type { Ref, InjectionKey } from "vue";
import type { Fun } from "@yy/utils";

interface RowContext {
  gutter: Ref<number>;
  details: Ref<any>;
  span: Ref<number | Fun<number> | undefined>;
}

export const rowContextKey: InjectionKey<RowContext> = Symbol("rowContextKey");
