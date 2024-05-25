import { createNamespace, isString } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";
import YFlex from "@nimble-ui/components/flex";

import paginationProps from "./types";

export default defineComponent({
  name: "YPagination",
  props: paginationProps(),
  setup(props, ctx) {
    const bem = createNamespace("pagination");

    const selfModel = ref(1);
    const current = computed({
      get: () => props.modelValue ?? selfModel.value,
      set(val) {
        selfModel.value = val;
        props.onChange?.(val, props.pageSize);
        props["onUpdate:modelValue"]?.(val);
      },
    });

    const total = computed(() => Math.ceil(props.total / props.pageSize));
    const list = computed(() => {
      let list: Array<number | string> = [];
      const showNme = 9;
      const center = showNme - 3;

      if (total.value <= showNme) {
        list = Array.from({ length: showNme }).map((_, i) => i + 1);
      } else if (current.value <= center) {
        // 首
        list = Array.from({ length: showNme - 2 }).map((_, i) => i + 1);
        list = [...list, "5", total.value];
      } else if (current.value > total.value - center) {
        // 尾
        list = Array.from({ length: showNme - 2 }).map((_, i) => total.value - center + i);
        list = [1, "-5", ...list];
      } else {
        // 中
        const len = showNme - 4;
        list = Array.from({ length: len }).map((_, i) => current.value - (len - 1) / 2 + i);
        list = [1, "-5", ...list, "5", total.value];
      }

      return list;
    });

    const onPrev = () => {
      current.value = Math.max(current.value - 1, 1);
    };
    const onNext = () => {
      current.value = Math.max(current.value + 1, total.value);
    };

    const onItem = (val: string | number) => {
      if (isString(val)) {
        let value = current.value + Number(val);
        value = Math.max(value, 1);
        current.value = Math.min(value, total.value);
      } else {
        current.value = val;
      }
    };

    return () => {
      const { size } = props;
      return (
        <YFlex gap={5} class={bem.b()} align="center">
          <YFlex align="center">{ctx.slots.total?.({ total: total.value, current: current.value })}</YFlex>
          <YFlex
            align="center"
            justify="center"
            class={[bem.e("item"), bem.is("small", size == "small"), bem.is("disabled", current.value == 1)]}
            onClick={onPrev}
          >
            <span class={[bem.is("positive"), bem.m("prev", "item"), bem.m("arrow", "item")]}></span>
          </YFlex>
          {list.value.map((item) => {
            const isStr = isString(item);
            return (
              <YFlex
                align="center"
                justify="center"
                class={[
                  bem.e("item"),
                  bem.is("more", isStr),
                  bem.is("small", size == "small"),
                  bem.is("active", current.value === item),
                ]}
                onClick={onItem.bind(null, item)}
              >
                {isStr ? "•••" : item}
              </YFlex>
            );
          })}
          <YFlex
            align="center"
            justify="center"
            class={[bem.e("item"), bem.is("small", size == "small"), bem.is("disabled", current.value == total.value)]}
            onClick={onNext}
          >
            <span class={[bem.m("arrow", "item"), bem.m("next", "item"), bem.is("positive")]}></span>
          </YFlex>
        </YFlex>
      );
    };
  },
});
