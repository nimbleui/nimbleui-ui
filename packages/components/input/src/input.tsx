import { defineComponent, computed, watch, ref, onMounted, nextTick } from "vue";
import { createNamespace, endComposing, handlePropOrContext, startComposing } from "@nimble-ui/utils";
import { formItemContextKey } from "@nimble-ui/tokens";
import { useParent, useCreateId } from "@nimble-ui/hooks";

import inputProp from "./types";
import { eyeIcon, eyeInvisibleIcon } from "./icons";

export default defineComponent({
  name: "YInput",
  props: inputProp(),
  emits: ["blur", "focus", "change", "update:modelValue", "clear", "input"],
  setup(props, ctx) {
    // 处理formItem组件传过的数据
    const formItemContext = useParent(formItemContextKey);
    const isFocus = ref(false);
    const selfModel = ref("");

    const inputRef = ref<HTMLInputElement>();
    const formValue = computed(() => (props.modelValue == null ? selfModel.value : String(props.modelValue)));

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

    const focus = async () => {
      await nextTick();
      isFocus.value = true;
      inputRef.value?.focus();
    };

    // 更新输入框内容
    const setNativeInputValue = () => {
      const input = inputRef.value;
      const formatterValue = props.formatter?.(formValue.value) ?? formValue.value;
      if (!input || input.value === formatterValue) return;

      input.value = formatterValue;
    };

    // 输入框内容发生变化
    const onInput = (event: Event) => {
      const { target } = event;
      if ((target as any).composing) return;

      let { value } = event.target as HTMLInputElement;
      if (props.formatter) {
        value = props.parser ? props.parser(value) : value;
      }

      if (value === formValue.value) {
        return setNativeInputValue();
      }

      ctx.emit("update:modelValue", value);
      ctx.emit("input", value);
      selfModel.value = value;

      setNativeInputValue();
    };

    // 输入框失去焦点
    const onBlur = (event: Event) => {
      ctx.emit("blur", event);
      isFocus.value = false;
      formItemContext?.parent.events("onBlur", formValue.value);
    };

    // 输入框获取焦点
    const onFocus = (event: Event) => {
      ctx.emit("focus", event);
      focus();
      formItemContext?.parent.events("onFocus", formValue.value);
    };

    const onChange = (event: Event) => {
      ctx.emit("change", (event.target as HTMLInputElement).value);
    };

    watch(
      () => props.modelValue,
      () => {
        setNativeInputValue();
      }
    );

    onMounted(() => {
      setNativeInputValue();
    });

    const { id: inputId } = useCreateId();

    ctx.expose({
      focus,
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
    const onEye = (bool: boolean) => {
      isEye.value = bool;
      focus();
    };
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
          {ctx.slots.prefix && <span class={bem.e("prefix")}>{ctx.slots.prefix?.()}</span>}
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
              onChange={onChange}
              onCompositionend={endComposing}
              onCompositionstart={startComposing}
            />
          </span>
          <span class={bem.e("suffix")}>
            <slot name="suffix" />
            {allowClear &&
              formValue.value &&
              (clearTrigger === "always" || (clearTrigger === "focus" && isFocus.value) ? (
                <span onClick={onClear} class={bem.e("clear")}></span>
              ) : null)}
            <div></div>
          </span>
          {type == "password" && (
            <span class={bem.e("password")}>
              <i onClick={onEye.bind(null, !isEye.value)} class={bem.m("icon", "password")}>
                {isEye.value ? eyeIcon : eyeInvisibleIcon}
              </i>
            </span>
          )}
        </div>
      );
    };
  },
});
