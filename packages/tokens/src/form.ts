import type { InjectionKey } from "vue";

import { Context } from "./types";

export type EventType = "onBlur" | "onChange" | "onSubmit" | "onFocus";

export const formContextKey: InjectionKey<Context<FormProps>> = Symbol("formContextKey");
