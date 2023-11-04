import { Transition, computed, defineComponent, reactive } from "vue";
import { formContextKey, formItemContextKey, Rule, TriggerEventType, FormItemState } from "@nimble-ui/tokens";
import { useParent, useChildren, useExpose } from "@nimble-ui/hooks";
import { createNamespace, isFunction } from "@nimble-ui/utils";

import formItemProp from "./types";
import type { FormItemExpose, FormItemValidateError } from "./types";
import { getRuleMessage, runSyncRule, isEmptyValue, runRuleValidator, formatRules, filterRules } from "./utils";
import { YFlex } from "@nimble-ui/components/flex";

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
    const details = computed(() => props.details || formContext?.parent.props.details);

    const { linkChildren, children } = useChildren(formItemContextKey);
    linkChildren({
      state,
      propsRef: computed(() => ({
        details: props.details,
      })),
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
      const { bordered } = props;

      return [bem.b(), bem.is("border", bordered), bem.is("focus", state.focus)];
    });

    // 执行校验规则
    const runRules = (rules: Rule[]) => {
      return rules.reduce((promise, rule) => {
        return promise.then(() => {
          if (state.status == "failed") return;
          let value = children[0]?.public.formValue.value;
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
        if (props.required && !children[0]?.public.formValue.value) {
          state.status = "failed";
          state.message = props.required;
          return Promise.resolve({
            name: children[0]?.public.name,
            message: state.message,
          });
        }
        if (!rules) return resolve();

        runRules(rules).then(() => {
          if (state.status === "failed") {
            resolve({
              name: children[0]?.public.name,
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

    const labelFor = computed(() => {
      return props.for || children.length === 1 ? children[0]?.public.inputId?.value : undefined;
    });

    const inputPublic = computed(() => {
      const name = children[0]?.public.name;
      let value: any;
      if (children.length > 1) {
        value = children.reduce<any[]>((acc, child) => {
          const modelValue = child?.public.formValue.value;
          if (modelValue) {
            acc.push(modelValue);
          }
          return acc;
        }, []);
      } else {
        value = children[0]?.public.formValue.value;
      }
      return { name, value };
    });

    const disabled = computed(() => (children.length === 1 ? children[0].public.formItemDisabled?.value : false));

    useExpose<FormItemExpose>({
      state,
      validate,
      inputPublic,
    });

    return () => {
      const { label, uuId, vertical, errorPosition } = props;

      return (
        <YFlex vertical={vertical} class={formItemCls.value}>
          {
            <label for={labelFor.value} class={[bem.e("label"), bem.is("disabled", disabled.value ?? false)]}>
              {isFunction(label) ? label(details.value, uuId) : label || ctx.slots.label?.({ details: details.value })}
            </label>
          }
          <div class="y-form-item__content">{ctx.slots.default?.({ details: details.value })}</div>
          {state.status === "failed" ? (
            <Transition appear name="y-input-shake">
              <div class={[bem.e("error"), bem.is(errorPosition)]}>{state.message}</div>
            </Transition>
          ) : null}
        </YFlex>
      );
    };
  },
});
