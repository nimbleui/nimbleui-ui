import { createNamespace, isFunction } from "@nimble-ui/utils";
import { defineComponent, onMounted, computed, ref, watch, nextTick, reactive } from "vue";

import tabsProps, { TabItemType } from "./types";
import YFlex, { FlexInstance } from "@nimble-ui/components/flex";

export default defineComponent({
  name: "YTabs",
  props: tabsProps(),
  emits: ["change", "click", "update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("tabs");
    const barElRef = ref<HTMLElement>();
    const tabsElRef = ref<FlexInstance>();
    const selfModel = ref<string | number>();
    const contents: TabItemType[] = reactive([]);

    const handelContent = (active: string | number) => {
      const { items, keyField } = props;
      const index = contents.findIndex((item) => item[keyField] == active);
      if (index > -1) return;

      const item = items?.find((item) => item[keyField] == active);
      item && contents.push(item);
    };

    const getCurrentEl = () => {
      const { value } = active;
      if (!value) return;
      handelContent(value);

      const tabEl = tabsElRef.value?.$el.querySelector(`[data-name="${value}"]`) as HTMLElement | null;
      if (tabEl) updateBarStyle(tabEl);
    };

    const vertical = computed(() => {
      const { tabPosition } = props;
      return tabPosition == "left" || tabPosition == "right";
    });

    const updateBarStyle = (el: HTMLElement) => {
      const { offsetWidth: w, offsetLeft: l, offsetHeight: h, offsetTop: t } = el;
      if (!barElRef.value) return;
      const { value } = vertical;
      const size = value ? h : w;
      const site = value ? t : l;

      barElRef.value.style[value ? "height" : "width"] = `${size}px`;
      barElRef.value.style.transform = `translate${value ? "Y" : "X"}(-50%)`;
      barElRef.value.style[value ? "top" : "left"] = `${site + size / 2}px`;
    };

    const active = computed({
      get: () => props.modelValue ?? selfModel.value,
      set: (value) => {
        selfModel.value = value;
        ctx.emit("change", value);
        ctx.emit("update:modelValue", value);
      },
    });

    const handleEvent = (item: TabItemType, type: "click" | "enter", disabled?: boolean) => {
      return (e: Event) => {
        if (disabled) return;

        const { keyField, trigger } = props;
        const value = item[keyField] as number | string;
        if ((trigger === "click" && type === "click") || (trigger === "hover" && type === "enter")) {
          active.value = value;
          ctx.emit("click", item, e);
        }
      };
    };

    watch(
      () => props.items,
      (items) => {
        const value = items?.[0]?.[props.keyField] as number | string | undefined;
        active.value ??= value;
      },
      { immediate: true, deep: true }
    );

    watch(active, () => {
      nextTick(getCurrentEl);
    });
    onMounted(getCurrentEl);

    const contentRender = () => {
      return (
        <div class={bem.e("content")}>
          {contents.map((item) => {
            const child = isFunction(item.children) ? item.children(item, props.details) : item.children;
            const key = item[props.keyField] as string | number;
            return (
              <div v-show={active.value == key} class={bem.m("pane", "content")}>
                {child}
              </div>
            );
          })}
        </div>
      );
    };

    return () => {
      const { items, labelField, keyField, centered, type, renderTabBar, tabPosition, details } = props;
      return items?.length ? (
        <YFlex ref={tabsElRef} class={bem.b()} vertical={!vertical.value}>
          {(tabPosition == "right" || tabPosition == "bottom") && contentRender()}
          <YFlex
            class={[bem.e("nav"), bem.is("center", centered)]}
            justify={centered ? "center" : "flex-start"}
            align={tabPosition === "top" || tabPosition == "left" ? "flex-end" : "flex-start"}
          >
            <YFlex class={bem.e("list")} vertical={vertical.value}>
              {items.map((item) => {
                const key = item[keyField] as string | number;
                const label = item[labelField];
                const disabled = isFunction(item.disabled) ? item.disabled(details) : item.disabled ?? false;

                return (
                  <YFlex
                    key={key}
                    class={[
                      bem.m("tab", "list"),
                      bem.is(tabPosition),
                      bem.is("card", type == "card"),
                      bem.is("active", active.value == key),
                      bem.is("disabled", disabled),
                    ]}
                    vertical={vertical.value}
                  >
                    <div
                      data-name={key}
                      class={bem.m("tab-btn", "list")}
                      onClick={handleEvent(item, "click", disabled)}
                      onMouseenter={handleEvent(item, "enter", disabled)}
                    >
                      {renderTabBar?.(item, details) || label}
                    </div>
                  </YFlex>
                );
              })}
              <div
                ref={barElRef}
                class={[bem.m("bar", "list"), bem.is("hide", type == "card"), bem.is(tabPosition)]}
              ></div>
            </YFlex>
          </YFlex>
          {(tabPosition == "left" || tabPosition == "top") && contentRender()}
        </YFlex>
      ) : null;
    };
  },
});
