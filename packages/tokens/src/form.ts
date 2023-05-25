import type { InjectionKey, VNodeChild } from "vue";
import type { ProvideContext } from "./types";
import { FormProps } from "@yy/components";

export type TriggerEventType = "onBlur" | "onChange" | "onSubmit" | "onFocus";

export interface Rule {
  required?: boolean;
  message?: string | ((value: any, rule: Rule, details: any) => VNodeChild);
  validator?: (value: any, rule: Rule, details: any) => boolean | Promise<boolean>;
  pattern?: RegExp;
  trigger?: TriggerEventType | TriggerEventType[];
  formatter?: (value: any, rule: Rule, details: any) => any;
}

export type Rules = Rule | Array<Rule> | ((details: any) => Rule | Array<Rule>);

type FormContext = ProvideContext<{ props: FormProps }>;

export const formContextKey: InjectionKey<FormContext> = Symbol("formContextKey");
