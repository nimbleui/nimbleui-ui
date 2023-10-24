import { computed, defineComponent, provide } from "vue";
import { createNamespace } from "@nimble-ui/utils";
import { radioGroupContextKey } from "@nimble-ui/tokens";
import { YRadio } from "@nimble-ui/components/radio";

import radioGroupProps from "./types";

export default defineComponent({
  name: "YRadioGroup",
  props: radioGroupProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const bem = createNamespace("radio-group");

    const model = computed({
      get: () => props.modelValue,
      set: (val) => {
        ctx.emit("update:modelValue", val);
      },
    });

    const onChange = (value: string | number | boolean) => {
      model.value = value;
      ctx.emit("change", value);
    };

    const propsRef = computed(() => ({ ...props }));

    provide(radioGroupContextKey, {
      onChange,
      propsRef,
    });

    return () => {
      const { options, vertical } = props;
      return (
        <div class={[bem.b(), bem.is("vertical", vertical)]}>
          {options ? options.map((item, index) => <YRadio {...item} key={index} />) : ctx.slots.default?.()}
        </div>
      );
    };
  },
});
