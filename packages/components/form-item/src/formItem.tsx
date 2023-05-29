import { computed, defineComponent, reactive } from "vue";
import { formContextKey, formItemContextKey, Rule, TriggerEventType, FormItemState } from "@yy/tokens";
import { useParent, useChildren, useExpose } from "@yy/hooks";
import { createNamespace, isFunction, handlePropOrContext } from "@yy/utils";
import { YCol } from "@yy/components/col";

import formItemProp from "./types";
import type { FormItemExpose, FormItemValidateError } from "./types";
import { getRuleMessage, runSyncRule, isEmptyValue, runRuleValidator, formatRules, filterRules } from "./utils";

export default defineComponent({
  name: "YFormItem",
  props: formItemProp(),
  setup(props, ctx) {
    const state = reactive<FormItemState>({
      status: "init",
      message: "",
      focus: false,
    });
    // 处理form组件传过的数据
    const formContext = useParent(formContextKey);
    const { linkChildren, children } = useChildren(formItemContextKey, true);
    linkChildren({
      state,
      props,
      // input事件
      events(type) {
        if (type === "onChange") {
          state.message = "";
          state.status = "init";
        }
        if (type === "onFocus") {
          state.focus = true;
        }
        if (type === "onBlur") {
          state.focus = false;
        }

        validateWithTrigger(type);
      },
    });

    const bem = createNamespace("form-item");
    const formItemCls = computed(() => {
      const { labelAlign } = props;
      const result = handlePropOrContext(props, formContext?.parent.props, ["disabled"]);

      return [bem.b(), bem.b(labelAlign, labelAlign != "row"), bem.is("disabled", result.disabled)];
    });
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
              name: props.name || children?.public.name,
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
      state,
      validate,
      inputPublic: computed(() => ({
        name: children?.public.name,
        value: children?.public.modelValue,
      })),
    });

    return () => {
      const { span, label, uuId } = props;
      return (
        <YCol uuId={uuId} tag="label" span={span}>
          <div class={formItemCls.value}>
            <div class="y-form-item__title">{isFunction(label) ? label(details.value, uuId) : label}</div>
            <div class="y-form-item__content">{ctx.slots.default?.()}</div>
            {state.status === "failed" ? <div class="y-form-item__error">{state.message}</div> : null}
          </div>
        </YCol>
      );
    };
  },
});
