import { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@nimble-ui/utils";

type InputType = "text" | "number" | "password" | "textarea";
type FunType = (value: string) => string;

export const inputUniqueProp = {
  /**
   * @description 原生属性id
   */
  id: String,
  /**
   * @description 输入框是否为禁用状态
   */
  disabled: mergeFunctionProp<boolean>(Boolean),
  /**
   * @description 名称，作为提交表单时的标识符
   */
  name: String,
  /**
   * @description 输入框类型
   */
  type: {
    type: String as PropType<InputType>,
    default: "text",
  },
  /**
   * @description 当前输入的值
   */
  modelValue: {
    type: [String, Number],
  },
  /**
   * @description 是否有边框
   */
  bordered: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否为只读状态，只读状态下无法输入内容
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 输入框占位提示文字
   */
  placeholder: String,
  /**
   * @description 原生属性，最大输入长度
   */
  maxLength: Number,
  /**
   * @description 原生属性，最小输入长度
   */
  minLength: Number,
  /**
   * @description 原生属性，自动获取焦点
   */
  autofocus: Boolean,
  /**
   * @description 是否启用清除图标，点击清除图标后会清空输入框
   */
  allowClear: Boolean,
  /**
   * @description 显示清除图标的时机，always 表示输入框不为空时展示，focus 表示输入框聚焦且不为空时展示
   */
  clearTrigger: {
    type: String as PropType<"focus" | "always">,
    default: "focus",
  },
  /**
   * @description 指定输入值的格式
   */
  formatter: {
    type: Function as PropType<FunType>,
  },
  /**
   * @description 指定从格式化器输入中提取的值
   */
  parser: {
    type: Function as PropType<FunType>,
  },
  /**
   * @description 前缀
   */
  prefix: {
    type: Object as PropType<VNodeChild>,
  },
  /**
   * @description 后缀
   */
  suffix: {
    type: Object as PropType<VNodeChild>,
  },
  /**
   * @description type为textarea才生效
   */
  rows: {
    type: Number,
    default: 2,
  },
  /**
   * @description 自适应内容高度，只适用于textarea
   */
  autoSize: {
    type: [Boolean, Object] as PropType<boolean | { minRows: number; maxRows: number }>,
  },
};

const inputProp = mergeCommonProp(inputUniqueProp);

export default inputProp;

export type InputExpose = {
  inputId: ComputedRef<string>;
  formValue: ComputedRef<unknown>;
  formItemDisabled: ComputedRef<boolean>;
  focus: () => void;
};

export type InputProps = ExtractPropTypes<ReturnType<typeof inputProp>>;
export type InputInstance = ComponentPublicInstance<InputProps, InputExpose>;
