import { defineComponent, computed, watch, ref, onMounted } from "vue";
import { createNamespace, endComposing, handlePropOrContext, startComposing } from "@nimble-ui/utils";
import { TriggerEventType, formItemContextKey } from "@nimble-ui/tokens";
import { useExpose, useParent, useCreateId } from "@nimble-ui/hooks";

import inputProp from "./types";
import type { InputExpose } from "./types";
import { eyeIcon, eyeInvisibleIcon } from "./icons";

export default defineComponent({
  name: "YInput",
  props: inputProp(),
  emits: ["blur", "focus", "change", "update:modelValue", "clear"],
  setup(props, ctx) {
    // 处理formItem组件传过的数据
    const formItemContext = useParent(formItemContextKey);
    const isFocus = computed(() => formItemContext?.parent.state.focus);
    const selfModel = ref("");

    const inputRef = ref<HTMLInputElement>();
    const formValue = computed(() => props.modelValue ?? selfModel.value);
    const getModelValue = () => String(props.modelValue == null ? "" : props.modelValue);

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
    const updateValue = (value: string) => {
      if (value !== formValue.value) {
        selfModel.value = value;
        ctx.emit("update:modelValue", value);
      }
      inputRef.value && (inputRef.value.value = value);
    };

    // 输入框内容发生变化
    const onInput = (event: Event) => {
      const { target } = event;
      if (!(target as any).composing) {
        updateValue((target as HTMLInputElement).value);
        formItemContext?.parent.events("onChange", formValue.value);
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

    const isEye = ref(false);
    const onEye = () => (isEye.value = false);
    const onInvisible = () => (isEye.value = true);
    const newType = computed(() => {
      const { type } = props;
      if (type == "password") {
        return isEye.value ? "text" : "password";
      }
      return type;
    });
    return () => {
      const { type, placeholder, maxLength, minLength, readonly, autofocus, clearTrigger, allowClear } = props;

      return (
        <div class={inputData.value.cls}>
          <span class={bem.e("wrapper")}>
            <input
              type={newType.value}
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
          {type == "password" && (
            <span class={bem.e("password")}>
              {isEye.value && (
                <i onClick={onEye} class={bem.m("icon", "password")}>
                  {eyeIcon}
                </i>
              )}
              {!isEye.value && (
                <i onClick={onInvisible} class={bem.m("icon", "password")}>
                  {eyeInvisibleIcon}
                </i>
              )}
            </span>
          )}
        </div>
      );
    };
  },
});
