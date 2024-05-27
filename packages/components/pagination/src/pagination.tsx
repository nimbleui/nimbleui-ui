import { createNamespace, isString } from "@nimble-ui/utils";
import { computed, defineComponent, reactive, ref } from "vue";
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
      let showNum = Math.max(props.pageSlot, 7);
      showNum = showNum % 2 == 0 ? showNum + 1 : showNum; // 确保奇数
      const center = Math.ceil(showNum / 2);

      if (total.value <= showNum) {
        list = Array.from({ length: showNum }).map((_, i) => i + 1);
      } else if (current.value <= showNum - 3) {
        // 首
        list = Array.from({ length: showNum - 2 }).map((_, i) => i + 1);
        list = [...list, `${center}`, total.value];
      } else if (current.value > total.value - (showNum - 3)) {
        // 尾
        list = Array.from({ length: showNum - 2 }).map((_, i) => total.value - (showNum - 3) + i);
        list = [1, `-${center}`, ...list];
      } else {
        // 中
        const len = showNum - 4;
        list = Array.from({ length: len }).map((_, i) => current.value - (len - 1) / 2 + i);
        list = [1, `-${center}`, ...list, `${center}`, total.value];
      }

      return list;
    });

    const onPrev = () => {
      current.value = Math.max(current.value - 1, 1);
    };
    const onNext = () => {
      current.value = Math.min(current.value + 1, total.value);
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

    const showList = reactive([false, false]);
    const onMouse = (index: number, value: boolean) => {
      showList[index] = value;
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
            const index = +item > 0 ? 1 : 0;
            const isShowArrow = isStr ? showList[index] : false;
            const node = isShowArrow ? (
              <span class={[bem.m("initiate", "item"), bem.is("reverse", index == 1)]}></span>
            ) : (
              "•••"
            );

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
                onMouseenter={onMouse.bind(null, index, isStr ? true : false)}
                onMouseleave={onMouse.bind(null, index, false)}
              >
                {isStr ? node : item}
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
