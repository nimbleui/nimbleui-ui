import { watch, defineComponent, ref, reactive, type CSSProperties } from "vue";
import { createNamespace } from "@nimble-ui/utils";

function getOffset(start: number, end: number, unit: -1 | 1) {
  let index = start;
  let offset = 0;

  while ((index + 10) % 10 !== end) {
    index += unit;
    offset += unit;
  }

  return offset;
}

export default defineComponent({
  name: "YSingleNumber",
  props: {
    value: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const bem = createNamespace("number");
    const value = ref<number>();
    const prevValue = ref<number>();
    const styles = reactive<CSSProperties>({});

    watch(
      () => [props.value, props.count],
      (newValue, oldValue) => {
        const next = Number(newValue[0]);
        const prev = Number(oldValue?.[0]);
        value.value = next;
        prevValue.value = prev;

        if (oldValue && !Number.isNaN(next) && !Number.isNaN(prev)) {
          const unit = newValue[1] > oldValue[1] ? 1 : -1;
          const offset = getOffset(prev, next, unit);
          styles.transform = `translateY(${-offset}00%)`;
          styles.transition = "all .2s";
        }
      },
      { immediate: true }
    );

    const renderUnitNumber = () => {
      const next = value.value;
      const prev = prevValue.value;
      if (next == prev || prev == null || next == null || Number.isNaN(prev) || Number.isNaN(next)) {
        styles.transform = `translateY(0)`;
        styles.transition = "none";
        return <span class={[bem.m("unit", "only"), bem.is("current")]}>{next}</span>;
      }

      const end = next + 10;
      const unitNumberList: number[] = [];
      for (let i = next; i <= end; i++) {
        unitNumberList.push(i);
      }

      const prevIndex = unitNumberList.findIndex((n) => n % 10 === prev);
      return unitNumberList.map((n, index) => {
        const number = n % 10;
        return (
          <span
            key={n}
            class={[bem.m("unit", "only"), bem.is("current", prevIndex === index)]}
            style={{ top: `${index - prevIndex}00%`, left: 0 }}
          >
            {number}
          </span>
        );
      });
    };

    const onTransitionEnd = () => {
      prevValue.value = value.value;
    };

    return () => {
      return (
        <span class={bem.e("only")} style={styles} onTransitionend={onTransitionEnd}>
          {renderUnitNumber()}
        </span>
      );
    };
  },
});
