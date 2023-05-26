import { computed, defineComponent, reactive } from "vue";
import { YCol } from "@yy/components";
import { formContextKey, formItemContextKey, Rule, TriggerEventType } from "@yy/tokens";
import { useParent, useChildren, useExpose } from "@yy/hooks";

import formItemProp from "./types";
import type { FormItemExpose, FormItemState, FormItemValidateError } from "./types";
import { getRuleMessage, runSyncRule, isEmptyValue, runRuleValidator, formatRules, filterRules } from "./utils";

export default defineComponent({
  name: "YFormItem",
  props: formItemProp(),
  setup(props, ctx) {
    const state = reactive<FormItemState>({
      status: "init",
      message: "",
    });
    // 处理form组件传过的数据
    const formContext = useParent(formContextKey);
    const { linkChildren, children } = useChildren(formItemContextKey, true);
    linkChildren({
      props,
      events(type) {
        validateWithTrigger(type);
      },
    });

    const runRules = (rules: Rule[]) => {
      return rules.reduce((promise, rule) => {
        return promise.then(() => {
          if (state.status == "failed") return;

          let value = children?.public.modelValue;
          const details = props.details || formContext?.parent.props.details;

          if (rule.formatter) {
            value = rule.formatter(value, rule, details);
          }

          if (!runSyncRule(value, rule)) {
            state.status = "failed";
            state.message = getRuleMessage(value, rule, details);
            return;
          }

          if (rule.validator) {
            if (isEmptyValue(value)) return;

            return runRuleValidator(value, rule, details).then((result) => {
              if (result && typeof result === "string") {
                state.status = "failed";
                state.message = result;
              } else if (result === false) {
                state.status = "failed";
                state.message = getRuleMessage(value, rule, details);
              }
            });
          }
        });
      }, Promise.resolve());
    };

    const validate = (rules?: Rule[]) => {
      rules = formatRules(rules || props.rules, props.details);

      return new Promise<FormItemValidateError | void>((resolve) => {
        if (!rules) {
          return resolve();
        }
        runRules(rules).then(() => {
          if (state.status === "failed") {
            console.log("error", state.message);
            resolve({
              name: props.name,
              message: state.message,
            });
          } else {
            state.status = "passed";
            resolve();
          }
        });
      });
    };

    const validateWithTrigger = (trigger: TriggerEventType) => {
      const rules = filterRules(trigger, props.rules, props.details);
      if (rules.length) {
        validate(rules);
      }
    };

    useExpose<FormItemExpose>({
      validate,
      inputPublic: computed(() => ({
        name: children?.public.name,
        value: children?.public.modelValue,
      })),
    });

    return () => {
      const { span } = props;
      return (
        <YCol tag="label" span={span}>
          {ctx.slots.default?.()}
        </YCol>
      );
    };
  },
});
