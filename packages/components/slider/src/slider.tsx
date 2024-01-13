import { createNamespace, isFunction, isNumber } from "@nimble-ui/utils";
import { type VNodeChild, defineComponent, onMounted, reactive, ref, watch, computed } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { useMouseMove } from "@nimble-ui/hooks";

import sliderProps from "./types";
type ModelTypes = {
  value: number;
  site: number;
  show?: boolean; // 是否显示tooltip
  isDown?: boolean; // 是否按下滑块按钮
};
export default defineComponent({
  name: "YSlider",
  props: sliderProps(),
  emits: ["update:modelValue", "change"],
  setup(props, ctx) {
    const bem = createNamespace("slider");
    const railRef = ref<HTMLElement>();
    const model = reactive<ModelTypes[]>([]);
    const marksList: { label: VNodeChild | (() => VNodeChild); site: number }[] = reactive([]);

    // start：处理小圆圈的拖拽
    let startSite = 0; // 记录按下的位置
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
        const scale = (startSite + disX) / width;
        let value = Math.floor(scale * (max - min));

        const halfStep = step / 2;
        const remainder = value % step;
        if (step != 1 && remainder < halfStep) {
          return;
        } else if (value <= halfStep) {
          value = 0;
        } else {
          value = value + step - (step == 1 ? 1 : remainder);
        }

        value = value + min;
        if (isNumber(modelValue)) {
          ctx.emit("update:modelValue", value);
          ctx.emit("change", value);
        } else {
          const index = Number(target.dataset.index);
          modelValue[index] = value;
          ctx.emit("update:modelValue", modelValue);
          ctx.emit("change", [...modelValue]);
        }
      },
    });
    // end：处理小圆圈的拖拽

    const sunSite = (val: number) => {
      const railEl = railRef.value;
      if (!railEl) return 0;
      const { min, max } = props;
      const { height, width } = railEl.getBoundingClientRect();
      let value = Math.min(val, max);
      value = Math.max(value - min, 0);
      return (value / (max - min)) * width;
    };

    const settingSite = () => {
      const { modelValue } = props;

      if (isNumber(modelValue)) {
        model[0] = Object.assign(model[0] ?? {}, { value: modelValue, site: sunSite(modelValue) });
      } else {
        modelValue?.forEach((val, index) => {
          model[index] = Object.assign(model[index] ?? {}, { value: val, site: sunSite(val) });
        });
      }
    };

    const transformMarks = () => {
      const val = props.marks;
      marksList.length = 0;
      if (!val) return;
      Object.keys(val).forEach((key) => {
        const num = +key;
        marksList.push({ label: val[num], site: sunSite(num) });
      });
    };

    onMounted(() => {
      settingSite();
      transformMarks();
    });
    watch(() => props.modelValue, settingSite, { deep: true });
    watch(() => props.marks, transformMarks, { deep: true });

    // start：处理tooltip的显示与隐藏
    let currentItem: ModelTypes; // 当前项
    const onUp = () => {
      if (props.showTooltip) return;
      currentItem.show = false;
      currentItem.isDown = false;
      document.removeEventListener("mouseup", onUp, false);
    };
    const onDown = (item: ModelTypes) => {
      if (props.showTooltip) return;
      item.show = true;
      item.isDown = true;
      currentItem = item;
      document.addEventListener("mouseup", onUp, false);
    };
    const onToggle = (val: boolean, item: ModelTypes) => {
      if ((item.isDown && !val) || props.showTooltip) return;
      item.show = val;
    };
    // end：处理tooltip的显示与隐藏

    const trackSite = computed(() => {
      const first = model[0]?.site ?? 0;
      if (model.length == 1) {
        return [0, first];
      } else {
        const sites = model.map((item) => item.site);
        const min = Math.min(...sites);
        const max = Math.max(...sites);
        return [min, max - min];
      }
    });

    return () => {
      const { formatTooltip } = props;
      return (
        <div class={bem.b()}>
          <div ref={railRef} class={bem.e("rail")}>
            <div
              style={{ left: `${trackSite.value[0]}px`, width: `${trackSite.value[1]}px` }}
              class={bem.m("track", "rail")}
            ></div>
            {model.map((item, index) => (
              <YTooltip
                modelValue={item.show}
                onUpdate:modelValue={(val: boolean) => onToggle(val, item)}
                trigger="hover"
                placement="top"
              >
                {{
                  default: () => (
                    <span
                      key={index}
                      onMousedown={() => onDown(item)}
                      style={{ left: `${item.site}px` }}
                      data-index={index}
                      class={bem.m("handle", "rail")}
                    >
                      {ctx.slots.thumb?.()}
                    </span>
                  ),
                  content: () => {
                    return <span>{formatTooltip?.(item.value) ?? item.value}</span>;
                  },
                }}
              </YTooltip>
            ))}
          </div>
          <div class={bem.e("step")}></div>
          <div class={bem.e("marks")}>
            {marksList.map((item, index) => (
              <>
                <span key={index} style={{ left: `${item.site}px` }} class={bem.m("mark", "marks")}>
                  {isFunction(item.label) ? item.label() : item.label}
                </span>
                <span style={{ left: `${item.site}px` }} class={bem.m("dot", "marks")}></span>
              </>
            ))}
          </div>
        </div>
      );
    };
  },
});
