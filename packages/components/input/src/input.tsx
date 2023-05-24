import { defineComponent, inject, getCurrentInstance, onUnmounted, computed, watch, ref, onMounted } from "vue";
import { formContextKey, TriggerEventType } from "@yy/tokens";
import { useExpose } from "@yy/hooks";
import { endComposing, startComposing } from "@yy/utils";

import inputProp from "./types";
import type { InputExpose } from "./types";

export default defineComponent({
  name: "YInput",
  props: inputProp(),
  emits: ["blur", "focus", "change", "update:modelValue"],
  setup(props, ctx) {
    // 处理form组件穿过的数据
    const instance = getCurrentInstance();
    const formContext = inject(formContextKey, null);
    formContext?.link(instance);
    onUnmounted(() => {
      formContext?.unLink(instance);
    });

    const inputRef = ref<HTMLInputElement>();
    const formValue = computed(() => props.modelValue);
    const getModelValue = () => String(props.modelValue ?? "");

    const updateValue = (value: string, trigger: TriggerEventType = "onChange") => {
      if (value !== props.modelValue) {
        console.log(trigger);
        ctx.emit("update:modelValue", value);
      }
      inputRef.value && (inputRef.value.value = value);
    };

    const onInput = (event: Event) => {
      const { target } = event;
      if (!(target as any).composing) {
        updateValue((target as HTMLInputElement).value);
      }
    };

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue());
      }
    );

    onMounted(() => {
      updateValue(getModelValue());
    });

    useExpose<InputExpose>({
      formValue,
    });

    return () => {
      const { type } = props;
      return (
        <input
          ref={inputRef}
          onCompositionstart={startComposing}
          onCompositionend={endComposing}
          onInput={onInput}
          type={type}
        />
      );
    };
  },
});
