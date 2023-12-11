import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, nextTick, reactive, ref, watch } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import YFlex from "@nimble-ui/components/flex";

import ColorContent from "./colorContent";
import colorPickerProps from "./types";
import HueSlider from "./hueSlider";
import { hex2rgb, rgb2hsv } from "./color";

export default defineComponent({
  name: "YColorPicker",
  props: colorPickerProps(),
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("color-picker");
    const colorContentRef = ref<{ getColor: () => string; renderPanelColor: (color: string) => void }>();
    const colorValue = reactive({
      color: "",
      hsv: [] as number[],
      background: "",
    });

    const onChange = (color: number[]) => {
      // console.log(111);
      colorValue.color = `rgba(${color.join(",")})`;
    };

    watch(
      () => props.modelValue,
      (value) => {
        let rgba: number[] = [];
        if (value?.includes("#")) {
          rgba = hex2rgb(value);
        } else if (value?.includes("rgb")) {
          const parts = value
            .replace(/rgba|rgb|\(|\)/gm, "")
            .split(/\s|,/g)
            .filter((val) => val !== "")
            .map((val, index) => (index > 2 ? Number.parseFloat(val) : Number.parseInt(val, 10)));

          if (parts.length == 3) parts[3] = 1;
          rgba = parts;
        }

        const hsv = rgb2hsv(rgba[0], rgba[1], rgba[2]);
        colorValue.hsv = hsv;
        colorValue.background = `hsl(${hsv[0]}, 100%, 50%)`;
        colorValue.color = `rgba(${rgba.join(",")})`;
      },
      { immediate: true }
    );

    const active = ref(false);
    const onToggle = (val: boolean) => (active.value = val);

    const sliderChange = async (rgba: number[]) => {
      const color = `rgba(${rgba.join(",")})`;
      colorContentRef.value?.renderPanelColor(color);
      await nextTick();
      await nextTick();
      const res = colorContentRef.value?.getColor();
      if (res) colorValue.color = res;
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
                  <ColorContent
                    bem={bem}
                    color={modelValue}
                    ref={colorContentRef}
                    background={colorValue.background}
                    onChange={onChange}
                  />

                  <YFlex gap={12} class={bem.e("slider")}>
                    <YFlex flex="1" vertical gap={12}>
                      <HueSlider onChange={sliderChange} />
                      <HueSlider />
                    </YFlex>
                    <div style={{ backgroundColor: colorValue.color }} class={bem.m("block", "slider")}></div>
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
