import { defineComponent, computed, watch, ref, onMounted } from "vue";
import { createNamespace, endComposing, handlePropOrContext, startComposing } from "@yy/utils";
import { TriggerEventType, formItemContextKey } from "@yy/tokens";
import { useExpose, useParent, useCreateId } from "@yy/hooks";

import inputProp from "./types";
import type { InputExpose } from "./types";

export default defineComponent({
  name: "YInput",
  props: inputProp(),
  emits: ["blur", "focus", "change", "update:modelValue", "clear"],
  setup(props, ctx) {
    // 处理formItem组件传过的数据
    const formItemContext = useParent(formItemContextKey);
    const isFocus = computed(() => formItemContext?.parent.state.focus);

    const inputRef = ref<HTMLInputElement>();
    const formValue = computed(() => props.modelValue);
    const getModelValue = () => String(props.modelValue ?? "");

    // 根据props生成className
    const bem = createNamespace("input");
    const inputData = computed(() => {
      const res = handlePropOrContext(props, undefined, ["disabled", "bordered"]);

      return {
        ...res,
        cls: [
          bem.b(),
          bem.is("disabled", res.disabled),
          bem.is("bordered", res.bordered),
          bem.is("focus", !!isFocus.value && !res.disabled),
        ],
      };
    });

    // 更新输入框内容
    const updateValue = (value: string, trigger: TriggerEventType = "onChange") => {
      if (value !== props.modelValue) {
        console.log(trigger);
        ctx.emit("update:modelValue", value);
      }
      inputRef.value && (inputRef.value.value = value);
    };

    // 输入框内容发生变化
    const onInput = (event: Event) => {
      const { target } = event;
      if (!(target as any).composing) {
        updateValue((target as HTMLInputElement).value);
      }
    };

    // 输入框失去焦点
    const onBlur = (event: Event) => {
      ctx.emit("blur", event);
      formItemContext?.parent.events("onBlur", formValue.value);
    };

    // 输入框获取焦点
    const onFocus = (event: Event) => {
      ctx.emit("focus", event);
      formItemContext?.parent.events("onFocus", formValue.value);
    };

    watch(
      () => props.modelValue,
      () => {
        updateValue(getModelValue());
        formItemContext?.parent.events("onChange", formValue.value);
      }
    );

    onMounted(() => {
      updateValue(getModelValue());
    });

    const { id: inputId } = useCreateId();

    useExpose<InputExpose>({
      inputId,
      formValue,
      formItemDisabled: computed(() => inputData.value.disabled || false),
    });

    const onClear = () => {
      ctx.emit("update:modelValue", "");
      ctx.emit("clear", "");
      inputRef.value?.focus();
    };

    return () => {
      const { type, placeholder, maxLength, minLength, readonly, autofocus, clearTrigger, allowClear } = props;

      return (
        <div class={inputData.value.cls}>
          <span class={bem.e("wrapper")}>
            <input
              type={type}
              ref={inputRef}
              id={inputId.value}
              readonly={readonly}
              maxlength={maxLength}
              minlength={minLength}
              autofocus={autofocus}
              placeholder={placeholder}
              disabled={inputData.value.disabled}
              onBlur={onBlur}
              onFocus={onFocus}
              onInput={onInput}
              onCompositionend={endComposing}
              onCompositionstart={startComposing}
            />
          </span>
          <span class={bem.e("suffix")}>
            {allowClear &&
              formValue.value &&
              (clearTrigger === "always" || (clearTrigger === "focus" && isFocus.value) ? (
                <span onClick={onClear} class={bem.e("clear")}>
                  清除
                </span>
              ) : null)}
          </span>
        </div>
      );
    };
  },
});
