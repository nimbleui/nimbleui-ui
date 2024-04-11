import { createNamespace } from "@nimble-ui/utils";
import { defineComponent } from "vue";
import YTooltip from "@nimble-ui/components/tooltip";

import { dropdownOptionProps } from "./types";
import YDropdownMenu from "./dropdownMenu";

export default defineComponent({
  name: "YDropdownOption",
  props: dropdownOptionProps,
  setup(props) {
    const bem = createNamespace("dropdown-option");
    return () => {
      const { item, labelField, keyField, childrenKey } = props;
      const children = item[childrenKey];

      const itemDOM = <span>{item[labelField]}</span>;

      return (
        <div class={bem.b()}>
          {children ? (
            <YTooltip trigger="hover" placement="right-start" appendTo={props.domEl}>
              {{
                default: () => itemDOM,
                content: () => (
                  <YDropdownMenu
                    options={children}
                    labelField={labelField}
                    keyField={keyField}
                    childrenKey={childrenKey}
                  />
                ),
              }}
            </YTooltip>
          ) : (
            itemDOM
          )}
        </div>
      );
    };
  },
});
