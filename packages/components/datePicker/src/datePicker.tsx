import { createNamespace } from "@nimble-ui/utils";
import { computed, defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";

import datePickerProps, { type DatePickerModelValue } from "./types";
import { getCalendar } from "./utils";

export default defineComponent({
  name: "YDatePicker",
  props: datePickerProps(),
  setup(props, ctx) {
    const bem = createNamespace("date-picker");
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    getCalendar(date);

    const selfModel = ref<DatePickerModelValue>();
    const model = computed({
      get: () => props.modelValue ?? selfModel.value,
      set: (val) => {
        console.log(val);
      },
    });

    const formatModel = computed(() => {
      const { type } = props;

      if (type.indexOf("Range") > -1) {
        const lis = model.value as any;
        return [];
      }
      return [];
    });

    const dateList = computed(() => {
      const { modelValue, type } = props;

      if (type.indexOf("Range") > -1) {
        return [];
      } else {
        return [];
      }
    });

    const renderContent = () => {
      return (
        <div>
          <span></span>
        </div>
      );
    };

    return () => {
      return (
        <YTooltip>
          {{
            default: () => <span>666</span>,
            content: renderContent,
          }}
        </YTooltip>
      );
    };
  },
});
