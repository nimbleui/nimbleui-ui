import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, nextTick, reactive, ref, watch } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YFlex } from "@nimble-ui/components/flex";
import { YButton } from "@nimble-ui/components/button";
import { YInput } from "@nimble-ui/components/input";

import ColorContent from "./colorContent";
import AlphaSlider from "./alphaSlider";
import colorPickerProps from "./types";
import HueSlider from "./hueSlider";
import { type HSVType, color2hsv } from "./color";

export default defineComponent({
  name: "YColorPicker",
  props: colorPickerProps(),
  emits: ["update:modelValue", "confirm"],
  setup(props, ctx) {
    const bem = createNamespace("color-picker");
    const colorContentRef = ref<{ getColor: () => number[]; renderPanelColor: (color: string) => void }>();
    const colorValue = reactive({
      hsv: {} as HSVType,
      background: "",
      alpha: 1,
      rgb: [] as number[],
    });
    const currentColor = computed(() => {
      const { rgb, alpha } = colorValue;
      return `rgba(${rgb.join(",")},${Number(alpha.toFixed(3))})`;
    });

    const show = ref(false);
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
          colorContentRef.value?.renderPanelColor(`rgb(${colorValue.rgb.join(",")})`);
        });
      },
      { immediate: true }
    );

    // 是否打开状态
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

    const onConfirm = () => {
      show.value = false;
      ctx.emit("confirm", currentColor.value);
      ctx.emit("update:modelValue", currentColor.value);
    };

    return () => {
      const { modelValue, placement } = props;
      return (
        <div class={[bem.b(), bem.is("active", active.value)]}>
          <YTooltip
            contentClass={bem.e("content")}
            arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
            placement={placement}
            maxWidth={260}
            maxHeight={300}
            onToggle={onToggle}
            v-model={show.value}
          >
            {{
              default: () => (
                <div class={bem.e("title")}>
                  {ctx.slots.default?.() ?? (
                    <span style={`--y-color-picker-title-bg: ${modelValue}`} class={bem.m("color", "title")}></span>
                  )}
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
                    <div class={bem.m("block", "slider")}>
                      <span style={{ backgroundColor: currentColor.value }} class={bem.m("color", "slider")}></span>
                    </div>
                  </YFlex>

                  <YFlex gap={12}>
                    <YInput readonly modelValue={currentColor.value} />
                    <YButton onClick={onConfirm} size={"small"}>
                      ok
                    </YButton>
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
