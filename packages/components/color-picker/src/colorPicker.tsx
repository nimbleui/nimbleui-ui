import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, reactive, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import YFlex from "@nimble-ui/components/flex";

import ColorContent from "./colorContent";
import colorPickerProps from "./types";
import HueSlider from "./hueSlider";

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

    const rgba = reactive<number[]>([]);
    const sliderChange = (rgba: number[]) => {
      console.log(rgba);
      // renderPanelColor(`rgba(${rgba.join(",")})`);
    };

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
              content: () => (
                <YFlex vertical>
                  <ColorContent bem={bem} onChange={onChange} color={modelValue} />

                  <YFlex gap={12} class={bem.e("slider")}>
                    <YFlex flex="1" vertical gap={12}>
                      <HueSlider onChange={sliderChange} />
                      <HueSlider />
                    </YFlex>
                    <div style={{ backgroundColor: `rgba(${rgba.join(",")})` }} class={bem.m("block", "slider")}></div>
                  </YFlex>
                </YFlex>
              ),
            }}
          </YTooltip>
        </div>
      );
    };
  },
});
