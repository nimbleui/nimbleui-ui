import { createNamespace, isFunction, isNumber } from "@nimble-ui/utils";
import { type VNode, defineComponent, onMounted, reactive, ref, watch } from "vue";
import { useMouseMove } from "@nimble-ui/hooks";

import sliderProps from "./types";

export default defineComponent({
  name: "YSlider",
  props: sliderProps(),
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("slider");
    const railRef = ref<HTMLElement>();
    const model = reactive<number[]>([]);
    const marksList = ref<Array<{ label: VNode | (() => VNode); site: number }>>([]);

    let startSite = 0;
    useMouseMove(railRef, {
      prevent: true,
      boundary: railRef,
      moveLimit: true,
      expand: 7 * 1.2,
      agency: true,
      agencyTarget(target) {
        if (target.className.indexOf("y-slider__rail--handle") < 0) return;
        return target;
      },
      down(data, e, target) {
        startSite = target?.offsetLeft ?? 0;
      },
      move(data, e, target) {
        const { max, min, modelValue, step } = props;
        const { disX, disY } = data;
        const railEl = railRef.value;
        if (!railEl) return;
        const { height, width } = railEl.getBoundingClientRect();
        const scale = (startSite + disX + 7 * 1.2) / width;
        let value = Math.floor(scale * (max - min));

        const halfStep = step / 2;
        const remainder = value % step;
        if (step != 1 && remainder < halfStep) {
          return;
        } else if (value <= halfStep) {
          value = 0;
        } else {
          value = value + step - remainder;
        }

        value = value + min;
        if (isNumber(modelValue)) {
          ctx.emit("update:modelValue", value);
        } else {
          const index = Number(target.dataset.index);
          modelValue[index] = value;
          ctx.emit("update:modelValue", modelValue);
        }
      },
    });

    const sunSite = (val: number) => {
      const railEl = railRef.value;
      if (!railEl) return 0;
      const { min, max } = props;
      const { height, width } = railEl.getBoundingClientRect();
      let value = Math.min(val, max);
      value = Math.max(value - min, 0);
      return (value / (max - min)) * width - 7;
    };

    const settingSite = () => {
      const { modelValue } = props;

      if (isNumber(modelValue)) {
        model[0] = sunSite(modelValue);
      } else {
        modelValue.forEach((val, index) => {
          model[index] = sunSite(val);
        });
      }
    };

    const transformMarks = () => {
      const val = props.marks;
      if (!val) return;
      marksList.value = Object.keys(val).map((key) => {
        const num = +key;
        return {
          label: val[num],
          site: sunSite(num),
        };
      });
    };

    onMounted(() => {
      settingSite();
      transformMarks();
    });
    watch(() => props.modelValue, settingSite, { deep: true });
    watch(() => props.marks, transformMarks, { immediate: true, deep: true });

    return () => {
      return (
        <div class={bem.b()}>
          <div ref={railRef} class={bem.e("rail")}>
            <div class={bem.m("track", "rail")}></div>
            {model.map((val, index) => (
              <span key={index} style={{ left: `${val}px` }} data-index={index} class={bem.m("handle", "rail")}>
                {ctx.slots.thumb?.()}
              </span>
            ))}
          </div>
          <div class={bem.e("step")}></div>
          <div class={bem.e("marks")}>
            {marksList.value.map((item) => (
              <span class={bem.m("mark", "marks")}>{isFunction(item.label) ? item.label() : item.label}</span>
            ))}
          </div>
        </div>
      );
    };
  },
});
