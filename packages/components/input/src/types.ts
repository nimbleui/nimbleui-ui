import { ComputedRef, ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

type InputType = "text" | "number";

const inputProp = mergeCommonProp({
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
    default: "",
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
   * @description 表单校验规则
   */
  rules: {
    type: Array,
  },
});

export type InputExpose = {
  formValue: ComputedRef<unknown>;
};

export default inputProp;
export type InputProps = ExtractPropTypes<ReturnType<typeof inputProp>>;
