import { createNamespace } from "@nimble-ui/utils";
import YScrollbar from "@nimble-ui/components/scrollbar";
import { defineComponent, ref } from "vue";

import YDropdownOption from "./dropdownOption";
import { dropdownMenuProps } from "./types";

export default defineComponent({
  name: "YDropdownMenu",
  props: dropdownMenuProps,
  setup(props) {
    const domEl = ref<HTMLDivElement>();
    const bem = createNamespace("dropdown-menu");

    const renderOption = () => {
      const { childrenKey, labelField, keyField } = props;

      return props.options?.map((item) => (
        <YDropdownOption
          key={item[keyField]}
          item={item}
          childrenKey={childrenKey}
          labelField={labelField}
          keyField={keyField}
          domEl={domEl.value}
        />
      ));
    };

    return () => {
      return (
        <div class={bem.b()} ref={domEl}>
          <YScrollbar trigger="hover">{renderOption()}</YScrollbar>
        </div>
      );
    };
  },
});
