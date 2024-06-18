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
    const nativeValue = computed({
      get: () => (props.modelValue == null ? selfModel.value : String(props.modelValue)),
      set(val) {
        selfModel.value = val;
        ctx.emit("update:modelValue", val);
      },
    });

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
      const formatterValue = props.formatter?.(nativeValue.value) ?? nativeValue.value;
      if (input && input.value !== formatterValue) {
        input.value = formatterValue;
      }

      handelAutoSize();
    };

    // 输入框内容发生变化
    const onInput = async (event: Event) => {
      const { target } = event;
      if ((target as any).composing) return;

      let { value } = event.target as HTMLInputElement;
      if (props.formatter) {
        value = props.parser ? props.parser(value) : value;
      }

      if (value === nativeValue.value) {
        return setNativeInputValue();
      }

      ctx.emit("input", value);
      nativeValue.value = value;

      // 解决光标不在最后改变值，光标就跑到最后
      await nextTick();
      setNativeInputValue();
      formItemContext?.parent.events("onChange", value);
    };

    // 输入框失去焦点
    const onBlur = (event: Event) => {
      // 判断是否是在清除图标上
      if (isHoverClear.value) return;
      ctx.emit("blur", event);
      isFocus.value = false;
      formItemContext?.parent.events("onBlur", nativeValue.value);
    };

    // 输入框获取焦点
    const onFocus = (event: Event) => {
      ctx.emit("focus", event);
      focus();
      formItemContext?.parent.events("onFocus", nativeValue.value);
    };

    const onChange = (event: Event) => {
      ctx.emit("change", (event.target as HTMLInputElement).value);
    };

    watch(nativeValue, setNativeInputValue);
    onMounted(setNativeInputValue);

    const { id: inputId } = useCreateId();

    useExpose({
      focus,
      blur: () => inputRef.value?.blur(),
      inputId,
      formValue: nativeValue,
      formItemDisabled: computed(() => inputData.value.disabled || false),
    });

    const isHoverClear = ref(false);
    const onClearEnter = () => {
      isHoverClear.value = true;
    };
    const onClearLeave = () => {
      isHoverClear.value = false;
    };
    const onClear = () => {
      ctx.emit("clear", "");
      nativeValue.value = "";
      if (inputRef.value) {
        inputRef.value.value = "";
        inputRef.value.focus();
      }
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

    const onSuffix = () => ctx.emit("suffix", nativeValue.value, { name: props.name });
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
        size,
      } = props;

      const prefixSlot = ctx.slots.prefix && <span class={bem.e("prefix")}>{ctx.slots.prefix?.()}</span>;
      const prefixNode = prefix && <span class={bem.e("prefix-text")}>{prefix}</span>;
      const passwordNode = type == "password" && (
        <span class={bem.e("password")}>
          <i onClick={onEye.bind(null, !isEye.value)} class={bem.m("icon", "password")}>
            {isEye.value ? eyeIcon : eyeInvisibleIcon}
          </i>
        </span>
      );
      const clearNode =
        allowClear &&
        nativeValue.value &&
        (clearTrigger === "always" || (clearTrigger === "focus" && isFocus.value) ? (
          <span class={bem.e("suffix-icon")}>
            <span
              class={bem.e("clear")}
              onClick={onClear}
              onMouseenter={onClearEnter}
              onMouseleave={onClearLeave}
            ></span>
          </span>
        ) : null);
      const suffixSlot = ctx.slots.suffix && <span class={bem.e("suffix")}>{ctx.slots.suffix()}</span>;
      const suffixNode = suffix && (
        <span onClick={onSuffix} class={bem.e("suffix-text")}>
          {suffix}
        </span>
      );

      const { bordered, disabled } = inputData.value;
      const isAffix = allowClear || prefixNode || passwordNode || clearNode || suffixNode;
      const outlined = bem.e("input-outlined");
      const borderCls = bordered ? outlined : undefined;

      const InputNode =
        type === "textarea" ? (
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
            class={[bem.e("textarea"), bem.is("focus", isFocus.value)]}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            onInput={onInput}
            onChange={onChange}
            onCompositionend={endComposing}
            onCompositionstart={startComposing}
          />
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
            class={[
              bem.e("input"),
              bem.is("disabled", disabled),
              bem.is("focus", isFocus.value),
              bem.is("small", size == "small"),
              bem.is("large", size == "large"),
            ]}
            disabled={disabled}
            onBlur={onBlur}
            onFocus={onFocus}
            onInput={onInput}
            onChange={onChange}
            onCompositionend={endComposing}
            onCompositionstart={startComposing}
          />
        );

      return (
        <span class={[bem.b(), borderCls, bem.is("disabled", disabled), bem.is("focus", isFocus.value)]}>
          {prefixSlot}
          {isAffix ? (
            <span class={[bem.e("wrapper")]}>
              {prefixNode}
              {InputNode}
              {clearNode}
              {passwordNode}
              {suffixNode}
            </span>
          ) : (
            InputNode
          )}
          {suffixSlot}
        </span>
      );
    };
  },
});
