import type { InjectionKey } from "vue";
import type { ProvideContext, TriggerEventType } from "./types";
import { FormProps } from "@nimble-ui/components";

export interface Rule {
  required?: boolean;
  pattern?: RegExp;
  trigger?: TriggerEventType | TriggerEventType[];
  formatter?: (value: any, rule: Rule, details: any) => any;
  message?: string | ((value: any, rule: Rule, details: any) => string);
  validator?: (value: any, rule: Rule, details: any) => boolean | string | Promise<boolean | string>;
}

export type Rules = Rule | Array<Rule> | ((details: any) => Rule | Array<Rule>);

type FormContext = ProvideContext<{ props: FormProps }>;

export const formContextKey: InjectionKey<FormContext> = Symbol("formContextKey");
