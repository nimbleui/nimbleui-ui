import { createNamespace, isFunction } from "@nimble-ui/utils";
import { defineComponent, ref } from "vue";
import { YTooltip } from "@nimble-ui/components/tooltip";
import { YButton } from "@nimble-ui/components/button";
import { YFlex } from "@nimble-ui/components/flex";

import popConfirmProps from "./types";

export default defineComponent({
  name: "YPopConfirm",
  props: popConfirmProps(),
  emits: ["cancel", "confirm"],
  setup(props, ctx) {
    const bem = createNamespace("pop-confirm");

    const show = ref(false);
    const onCancel = () => {
      show.value = false;
      ctx.emit("cancel");
    };

    const loading = ref(false);
    const onConfirm = () => {
      const { beforeConfirm } = props;
      if (beforeConfirm) {
        loading.value = true;
        beforeConfirm((cancel) => {
          show.value = cancel ?? false;
          loading.value = false;
          ctx.emit("confirm");
        });
      } else {
        show.value = false;
        ctx.emit("confirm");
      }
    };

    const handelEvent = () => {
      if (!props.disabled) return;
      onConfirm();
    };

    return () => {
      const {
        disabled,
        hideCancel,
        okText,
        cancelText,
        okType = "primary",
        title,
        description,
        icon,
        placement,
      } = props;

      return (
        <YTooltip
          v-model={show.value}
          placement={placement}
          contentClass={bem.b()}
          arrowStyle="--y-arrow-bg: var(--y-color-bg-elevated);"
          disabled={disabled}
          onEvents={handelEvent}
        >
          {{
            default: () => ctx.slots.default?.(),
            content: () => (
              <div class={bem.e("content")}>
                <YFlex class={bem.e("message")}>
                  <span class={bem.m("icon", "message")}>{isFunction(icon) ? icon() : icon || ctx.slots.icon?.()}</span>
                  <div class={bem.m("text", "message")}>
                    <div class={bem.m("text-title", "message")}>
                      {isFunction(title) ? title() : title || ctx.slots.title?.()}
                    </div>
                    <div class={bem.m("text-description", "message")}>
                      {isFunction(description) ? description() : description || ctx.slots.description?.()}
                    </div>
                  </div>
                </YFlex>
                <YFlex gap={8} justify="flex-end">
                  {!hideCancel && (
                    <YButton onClick={onCancel} plain size={"small"}>
                      {cancelText || "取消"}
                    </YButton>
                  )}
                  <YButton loading={loading.value} onClick={onConfirm} size={"small"} type={okType}>
                    {okText || "确定"}
                  </YButton>
                </YFlex>
              </div>
            ),
          }}
        </YTooltip>
      );
    };
  },
});
