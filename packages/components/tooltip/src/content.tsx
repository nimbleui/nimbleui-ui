import { Teleport, Transition, defineComponent, inject, CSSProperties } from "vue";

import { tooltipContextKey } from "@yy/tokens";

import { contentProps } from "./props";
import { createNamespace, isFunction, isString } from "@yy/utils";

export default defineComponent({
  name: "YContent",
  props: contentProps(),
  setup(props, ctx) {
    const bem = createNamespace("tooltip-content");
    const tooltipContext = inject(tooltipContextKey);

    const getStyle = (): CSSProperties => {
      const el = tooltipContext?.triggerRef.value;
      if (!el) return {};
      const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = el;
      const { selectWidth } = props;
      return {
        position: "absolute",
        left: `${offsetLeft}px`,
        top: `${offsetTop + offsetHeight}px`,
        width: `${selectWidth || offsetWidth}px`,
      };
    };

    function renderItem() {
      const { menu, labelField } = props;

      return (
        <ul class={bem.e("menus")}>
          {menu?.map((item, index) => (
            <li class={bem.e("menu")} key={index}>
              {ctx.slots.default?.({ item, index }) || (
                <span>
                  {isString(item)
                    ? item
                    : isFunction(item[labelField])
                    ? item[labelField](item, index)
                    : item[labelField]}
                </span>
              )}
            </li>
          ))}
        </ul>
      );
    }

    return () => {
      const { appendTo, teleported, transition, show } = props;
      return (
        <Teleport to={appendTo} disabled={teleported}>
          <Transition name={transition}>
            <div style={getStyle()} class={bem.b()} v-show={show}>
              {renderItem()}
            </div>
          </Transition>
        </Teleport>
      );
    };
  },
});
