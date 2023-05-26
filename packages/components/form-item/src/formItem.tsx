import { computed, defineComponent, reactive } from "vue";
import { formContextKey, formItemContextKey, Rule, TriggerEventType } from "@yy/tokens";
import { useParent, useChildren, useExpose } from "@yy/hooks";
import { createNamespace, isFunction } from "@yy/utils";
import { YCol } from "@yy/components/col";

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
        if (type === "onChange") {
          state.message = "";
          state.status = "init";
        }

        validateWithTrigger(type);
      },
    });

    const bem = createNamespace("form-item");
    const formItemCls = computed(() => [bem.b()]);
    const details = computed(() => props.details || formContext?.parent.props.details);

    // 执行校验规则
    const runRules = (rules: Rule[]) => {
      return rules.reduce((promise, rule) => {
        return promise.then(() => {
          if (state.status == "failed") return;

          let value = children?.public.modelValue;

          if (rule.formatter) {
            value = rule.formatter(value, rule, details.value);
          }

          if (!runSyncRule(value, rule)) {
            state.status = "failed";
            state.message = getRuleMessage(value, rule, details.value);
            return;
          }

          if (rule.validator) {
            if (isEmptyValue(value)) return;

            return runRuleValidator(value, rule, details.value).then((result) => {
              if (result && typeof result === "string") {
                state.status = "failed";
                state.message = result;
              } else if (result === false) {
                state.status = "failed";
                state.message = getRuleMessage(value, rule, details.value);
              }
            });
          }
        });
      }, Promise.resolve());
    };

    const validate = (rules?: Rule[]) => {
      rules = formatRules(rules || props.rules, details.value);

      return new Promise<FormItemValidateError | void>((resolve) => {
        if (!rules) {
          return resolve();
        }
        runRules(rules).then(() => {
          if (state.status === "failed") {
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
      const { span, label, uuId } = props;
      return (
        <YCol tag="label" span={span}>
          <div class={formItemCls.value}>
            <div class="y-form-item__title">
              <span>{isFunction(label) ? label(details.value, uuId) : label}</span>
              {state.status === "failed" ? <span>{state.message}</span> : null}
            </div>
            {ctx.slots.default?.()}
          </div>
        </YCol>
      );
    };
  },
});
