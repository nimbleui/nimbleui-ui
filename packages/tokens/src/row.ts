import type { Ref, InjectionKey } from "vue";
import type { Fun } from "@yy/utils";

interface RowContext {
  gutter: number;
  details: any;
  span: number | Fun<number> | undefined;
}

export const rowContextKey: InjectionKey<Ref<RowContext>> = Symbol("rowContextKey");
