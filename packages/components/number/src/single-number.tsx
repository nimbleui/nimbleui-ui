import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "YSingleNumber",
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    prevValue: {
      type: [String, Number],
      required: true,
    },
  },
  setup(props, ctx) {
    const renderUnitNumber = () => {
      const { value, prevValue } = props;
      const end = +value + 10;
      const unitNumberList: number[] = [];
      for (let i = +value; i <= end; i++) {
        unitNumberList.push(i);
      }

      const prevIndex = unitNumberList.findIndex((n) => n % 10 === prevValue);
      return unitNumberList.map((n) => {
        const number = n % 10;
        return <span>{number}</span>;
      });
    };

    return () => {
      return <span>{renderUnitNumber()}</span>;
    };
  },
});
