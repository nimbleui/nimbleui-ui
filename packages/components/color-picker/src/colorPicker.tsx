import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, nextTick, reactive, ref, watch } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import YFlex from "@nimble-ui/components/flex";

import ColorContent from "./colorContent";
import AlphaSlider from "./alphaSlider";
import colorPickerProps from "./types";
import HueSlider from "./hueSlider";
import { type HSVType, color2hsv } from "./color";

export default defineComponent({
  name: "YColorPicker",
  props: colorPickerProps(),
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("color-picker");
    const colorContentRef = ref<{ getColor: () => number[]; renderPanelColor: (color: string) => void }>();
    const colorValue = reactive({
      hsv: {} as HSVType,
      background: "",
      alpha: 1,
      rgb: [] as number[],
    });

    const onChange = (color: number[]) => {
      colorValue.rgb = color.slice(0, 3);
    };

    watch(
      () => props.modelValue,
      (value) => {
        if (!value) return;
        color2hsv(value, (hsv, rgba) => {
          colorValue.hsv = hsv;
          colorValue.background = `hsl(${hsv.h}, 100%, 50%)`;
          colorValue.alpha = rgba[3];
          colorValue.rgb = rgba.slice(0, 3);
        });
      },
      { immediate: true }
    );

    const active = ref(false);
    const onToggle = (val: boolean) => (active.value = val);

    const sliderChange = async (rgba: number[]) => {
      const color = `rgba(${rgba.join(",")})`;
      colorContentRef.value?.renderPanelColor(color);
      await nextTick();
      const res = colorContentRef.value?.getColor();
      if (res) {
        colorValue.rgb = res.slice(0, 3);
      }
    };

    const onChangeAlpha = (alpha: number) => {
      colorValue.alpha = alpha;
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
                <div style={{ backgroundColor: modelValue }} class={bem.e("title")}>
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
                    hsv={colorValue.hsv}
                  />

                  <YFlex gap={12} class={bem.e("slider")}>
                    <YFlex flex="1" vertical gap={12}>
                      <HueSlider hsv={colorValue.hsv} onChange={sliderChange} />
                      <AlphaSlider color={colorValue.rgb} alpha={colorValue.alpha} onChange={onChangeAlpha} />
                    </YFlex>
                    <div
                      style={{ backgroundColor: `rgba(${colorValue.rgb.join(",")},${colorValue.alpha})` }}
                      class={bem.m("block", "slider")}
                    ></div>
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
