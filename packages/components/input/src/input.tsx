import { defineComponent, computed, watch, ref, onMounted, nextTick, CSSProperties, reactive } from "vue";
import { createNamespace, endComposing, handlePropOrContext, isObject, startComposing } from "@nimble-ui/utils";
import { formItemContextKey } from "@nimble-ui/tokens";
import { useParent, useCreateId, useExpose } from "@nimble-ui/hooks";

import inputProp from "./types";
import { eyeIcon, eyeInvisibleIcon } from "./icons";
import { calculateAutoSizeStyle } from "./calculateAutoSizeStyle";

export default defineComponent({
  name: "YInput",
  props: inputProp(),
  emits: ["blur", "focus", "change", "update:modelValue", "clear", "input", "suffix"],
  setup(props, ctx) {
    // 处理formItem组件传过的数据
    const formItemContext = useParent(formItemContextKey);
    const isFocus = ref(false);
    const selfModel = ref("");

    const inputRef = ref<HTMLInputElement | HTMLTextAreaElement>();
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

    const textareaStyle = reactive<CSSProperties>({});
    const handelAutoSize = () => {
      const { autoSize, type } = props;
      if (type != "textarea" || !autoSize) return;
      let minRows = 2;
      let maxRows: number | undefined = undefined;

      if (isObject(autoSize)) {
        minRows = autoSize.minRows < 2 ? 2 : autoSize.minRows;
        maxRows = autoSize.maxRows;
      }

      const style = calculateAutoSizeStyle(inputRef.value as HTMLTextAreaElement, minRows, maxRows);
      Object.assign(textareaStyle, style);
    };

    // 更新输入框内容
    const setNativeInputValue = () => {
      const input = inputRef.value;
      const formatterValue = props.formatter?.(formValue.value) ?? formValue.value;
      if (!input || input.value === formatterValue) return;

      input.value = formatterValue;
      handelAutoSize();
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
      formItemContext?.parent.events("onChange", value);
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

    useExpose({
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

    const onSuffix = () => ctx.emit("suffix", formValue.value, { name: props.name });
    return () => {
      const {
        prefix,
        suffix,
        type,
        placeholder,
        maxLength,
        minLength,
        readonly,
        autofocus,
        clearTrigger,
        allowClear,
        rows,
      } = props;

      return (
        <div class={inputData.value.cls}>
          {ctx.slots.prefix && <span class={bem.e("prefix")}>{ctx.slots.prefix?.()}</span>}
          {prefix && <span class={bem.e("prefix-text")}>{prefix}</span>}
          <span class={bem.e("wrapper")}>
            {type === "textarea" ? (
              <textarea
                rows={rows}
                ref={inputRef}
                id={inputId.value}
                readonly={readonly}
                maxlength={maxLength}
                minlength={minLength}
                autofocus={autofocus}
                style={textareaStyle}
                placeholder={placeholder}
                class={bem.m("textarea", "wrapper")}
                disabled={inputData.value.disabled}
                onBlur={onBlur}
                onFocus={onFocus}
                onInput={onInput}
                onChange={onChange}
                onCompositionend={endComposing}
                onCompositionstart={startComposing}
              ></textarea>
            ) : (
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
            )}
          </span>
          {allowClear &&
            formValue.value &&
            (clearTrigger === "always" || (clearTrigger === "focus" && isFocus.value) ? (
              <span class={bem.e("suffix-icon")}>
                <span onClick={onClear} class={bem.e("clear")}></span>
              </span>
            ) : null)}
          {type == "password" && (
            <span class={bem.e("password")}>
              <i onClick={onEye.bind(null, !isEye.value)} class={bem.m("icon", "password")}>
                {isEye.value ? eyeIcon : eyeInvisibleIcon}
              </i>
            </span>
          )}
          {suffix && (
            <span onClick={onSuffix} class={bem.e("suffix-text")}>
              {suffix}
            </span>
          )}
          {ctx.slots.suffix && ctx.slots.suffix?.()}
        </div>
      );
    };
  },
});
