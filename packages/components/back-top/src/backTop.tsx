import { createNamespace, isString } from "@nimble-ui/utils";
import { computed, defineComponent, ref, Teleport, Transition } from "vue";

import backTopProps from "./types";
import { useScrollParent } from "@nimble-ui/hooks";

export default defineComponent({
  name: "YBackTop",
  props: backTopProps(),
  setup(props, ctx) {
    const bem = createNamespace("back-top");
    const placeholderRef = ref<HTMLElement>();
    const listenTo = computed(() => {
      return props.listenTo || placeholderRef.value;
    });

    const show = ref(false);
    const scrollRef = useScrollParent(listenTo, (e: Event) => {
      const { target } = e;
      const el = target as HTMLElement;
      show.value = el.scrollTop >= props.scrollTop;
    });

    const styles = computed(() => {
      const { right, bottom } = props;
      return {
        right: isString(right) ? right : `${right}px`,
        bottom: isString(bottom) ? bottom : `${bottom}px`,
      };
    });

    const onBackTop = () => {
      scrollRef.value?.scrollTo({ top: 0, behavior: "smooth" });
    };

    return () => {
      const { mount } = props;
      return (
        <>
          <span ref={placeholderRef} style="display: none;"></span>
          <Teleport to={mount}>
            <Transition v-show={show.value} name={bem.name("fade-in-scale-up-transition")}>
              <div onClick={onBackTop} class={bem.b()} style={styles.value}>
                {ctx.slots.default?.()}
              </div>
            </Transition>
          </Teleport>
        </>
      );
    };
  },
});
