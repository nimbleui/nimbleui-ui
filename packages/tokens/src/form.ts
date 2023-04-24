import type { InjectionKey } from "vue";
import type { FormProps } from "@yy/components";

import { Context } from "./types";

export const formContextKey: InjectionKey<Context<FormProps>> = Symbol("formContextKey");
