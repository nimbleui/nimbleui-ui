import type { InjectionKey } from "vue";
import { Context, EventFun } from "./types";

type FieldContext = {
  event: EventFun;
} & Context;

export const fieldContextKey: InjectionKey<FieldContext> = Symbol("fieldContextKey");
