import { createNamespace, isFunction } from "@nimble-ui/utils";
import { defineComponent, onMounted, computed, ref, watch, nextTick, reactive } from "vue";

import tabsProps, { TabItemType } from "./types";
import YFlex from "@nimble-ui/components/flex/";

export default defineComponent({
  name: "YTabs",
  props: tabsProps(),
  emits: ["change", "click", "update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("tabs");
    const barElRef = ref<HTMLElement>();
    const tabsElRef = ref<HTMLElement>();
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

      const tabEl = tabsElRef.value?.querySelector(`[data-name="${value}"]`) as HTMLElement | null;
      if (tabEl) updateBarStyle(tabEl);
    };

    const updateBarStyle = (el: HTMLElement) => {
      const { offsetWidth, offsetLeft } = el;
      if (!barElRef.value) return;

      barElRef.value.style.width = `${offsetWidth}px`;
      barElRef.value.style.transform = `translateX(-50%)`;
      barElRef.value.style.left = `${offsetLeft + offsetWidth / 2}px`;
    };

    const active = computed({
      get: () => props.modelValue ?? selfModel.value,
      set: (value) => {
        selfModel.value = value;
        ctx.emit("change", value);
        ctx.emit("update:modelValue", value);
      },
    });

    const handleEvent = (item: TabItemType, type: "click" | "enter") => {
      return (e: Event) => {
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
            const child = isFunction(item.children) ? item.children(item) : item.children;
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
      const { items, labelField, keyField, centered, type, renderTabBar, vertical } = props;
      return items?.length ? (
        <YFlex class={bem.b()} vertical={!vertical}>
          <div ref={tabsElRef} class={[bem.e("nav"), bem.is("centered", centered), bem.is(type)]}>
            <div class={[bem.m("list", "nav"), bem.is("vertical", vertical)]}>
              {items.map((item) => {
                const key = item[keyField] as string | number;
                const label = item[labelField];

                return (
                  <div
                    key={key}
                    data-name={key}
                    class={[bem.m("list-tab", "nav"), bem.is("active", active.value == key)]}
                    onClick={handleEvent(item, "click")}
                    onMouseenter={handleEvent(item, "enter")}
                  >
                    <div class={bem.m("list-btn", "nav")}>{renderTabBar ? renderTabBar(item) : label}</div>
                  </div>
                );
              })}
              <div ref={barElRef} class={[bem.m("list-bar", "nav"), bem.is("hide", type == "card")]}></div>
            </div>
          </div>
          {contentRender()}
        </YFlex>
      ) : null;
    };
  },
});
