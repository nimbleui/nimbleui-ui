import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import ColorContent from "./colorContent";

import colorPickerProps from "./types";

export default defineComponent({
  name: "YColorPicker",
  props: colorPickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("color-picker");

    const onChange = () => {
      // console.log(111);
    };

    const active = ref(false);
    const onToggle = (val: boolean) => (active.value = val);

    return () => {
      const { modelValue } = props;
      return (
        <div class={[bem.b(), bem.is("active", active.value)]}>
          <YTooltip
            contentClass={bem.e("content")}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
            placement="bottom-start"
            maxWidth={260}
            maxHeight={300}
            onToggle={onToggle}
          >
            {{
              default: () => (
                <div class={bem.e("title")}>
                  {ctx.slots.default?.() ?? <span class={bem.m("color", "title")}></span>}
                </div>
              ),
              content: () => <ColorContent onChange={onChange} color={modelValue} />,
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
