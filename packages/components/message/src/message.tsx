import { createNamespace } from "@yy/utils";
import { Transition, defineComponent, ref } from "vue";

export default defineComponent({
  name: "YMessage",
  setup(props, ctx) {
    const bem = createNamespace("message");
    const messageRef = ref<HTMLElement>();

    return () => {
      return (
        <Transition>
          <div class={bem.b()} ref={messageRef}></div>
        </Transition>
      );
    };
  },
});
