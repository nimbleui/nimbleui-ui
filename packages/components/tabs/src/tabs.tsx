import { createNamespace } from "@nimble-ui/utils";
import { defineComponent, onMounted, computed, ref, watch, nextTick } from "vue";

import tabsProps, { TabItemType } from "./types";

export default defineComponent({
  name: "YTabs",
  props: tabsProps(),
  emits: ["change", "update:modelValue"],
  setup(props, ctx) {
    const bem = createNamespace("tabs");
    const barElRef = ref<HTMLElement>();
    const tabsElRef = ref<HTMLElement>();
    const lineElRef = ref<HTMLElement>();
    const selfModel = ref<string | number>();

    const getCurrentEl = () => {
      const { value } = active;
      if (!value) return;

      const tabEl = tabsElRef.value?.querySelector(`[data-name="${value}"]`) as HTMLElement | null;
      if (tabEl) updateBarStyle(tabEl);
    };

    const updateBarStyle = (el: HTMLElement) => {
      const { offsetWidth, offsetLeft } = el;
      if (!barElRef.value) return;

      barElRef.value.style.width = `${offsetWidth}px`;
      barElRef.value.style.transform = `translateX(-50%)`;
      barElRef.value.style.left = `${offsetLeft + offsetWidth / 2}px`;

      if (lineElRef.value) {
        lineElRef.value.style.background = `linear-gradient(to right, var(--y-tabs-nav-border-color) 0%, var(--y-tabs-nav-border-color) ${offsetLeft}px , transparent ${offsetLeft}px, transparent ${
          offsetLeft + offsetWidth - 2
        }px, var(--y-tabs-nav-border-color) ${offsetLeft + offsetWidth - 2}px, var(--y-tabs-nav-border-color) 100%)`;
      }
    };

    const active = computed({
      get: () => props.modelValue ?? selfModel.value,
      set: (value) => {
        selfModel.value = value;
        ctx.emit("change", value);
        ctx.emit("update:modelValue", value);
      },
    });

    const handleClick = (item: TabItemType) => {
      return () => {
        const value = item[props.keyField] as number | string;
        active.value = value;
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

    return () => {
      const { items, labelField, keyField, centered, type, renderTabBar } = props;
      return items?.length ? (
        <div class={bem.b()}>
          <div ref={tabsElRef} class={bem.e("nav")}>
            <div class={[bem.m("list", "nav"), bem.is("centered", centered)]}>
              {items.map((item) => {
                const key = item[keyField] as string | number;
                const label = item[labelField];

                return (
                  <div
                    key={key}
                    data-name={key}
                    class={[bem.m("list-tab", "nav"), bem.is("active", active.value == key), bem.is(type)]}
                    onClick={handleClick(item)}
                  >
                    <div class={bem.m("list-btn", "nav")}>{renderTabBar ? renderTabBar(item) : label}</div>
                  </div>
                );
              })}
              <div ref={barElRef} class={[bem.m("list-bar", "nav"), bem.is("hide", type == "card")]}></div>
            </div>
            <div ref={lineElRef} class={bem.m("line", "nav")}></div>
          </div>
          <div class={bem.e("content")}></div>
        </div>
      ) : null;
    };
  },
});
