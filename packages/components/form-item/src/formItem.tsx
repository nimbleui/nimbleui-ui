import { computed, defineComponent, reactive } from "vue";
import { YCol } from "@yy/components";
import { formContextKey, formItemContextKey, Rule } from "@yy/tokens";
import { useParent, useChildren, useExpose } from "@yy/hooks";

import formItemProp from "./types";
import type { FormItemExpose } from "./types";
// passed
export default defineComponent({
  name: "YFormItem",
  props: formItemProp(),
  setup(props, ctx) {
    const state = reactive({
      status: "failed",
      message: "",
    });
    // 处理form组件传过的数据
    const formContext = useParent(formContextKey);
    const { linkChildren, children } = useChildren(formItemContextKey);
    linkChildren({
      props,
      events(type, value) {
        console.log(type);
        console.log(value);
      },
    });

    const runRules = (rules: Rule[]) => {
      return rules.reduce((promise, rule) => {
        return promise.then(() => {
          if (state.status == "failed") {
            return;
          }

          const formValue = children[0]?.public.formValue;
        });
      }, Promise.resolve());
    };

    useExpose<FormItemExpose>({
      inputPublic: computed(() => ({
        name: children[0]?.public.name,
        value: children[0]?.public.formValue.value,
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
