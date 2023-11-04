import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@nimble-ui/utils";
import type { Rules, TriggerEventType, FormItemState } from "@nimble-ui/tokens";

export interface FormItemValidateError {
  name?: string;
  message: string;
}

const formItemProp = mergeCommonProp({
  /**
   * @description — 栅格占据的列数
   */
  span: mergeFunctionProp<number>(Number),
  /**
   * @description 展示内容
   */
  content: {
    type: [Function, String, Object] as PropType<string | VNodeChild | ((details: any) => VNodeChild)>,
  },
  /**
   * @description 表单校验规则
   */
  rules: {
    type: [Array, Function, Object] as PropType<Rules>,
  },
  /**
   * @description 输入框侧边文本
   */
  label: mergeFunctionProp<string>(String),
  /**
   * @description 表单校验触发时机
   */
  validateTrigger: {
    type: [String, Array] as PropType<TriggerEventType | Array<TriggerEventType>>,
  },
  /**
   * @description 和label原生标签相同能力
   */
  for: String,
  /**
   * @description 主轴的方向是否垂直
   */
  vertical: Boolean,
  /**
   * @description 是否有边框
   */
  bordered: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 错误提示的位置
   */
  errorPosition: {
    type: String as PropType<"right-top" | "bottom">,
    default: "right-top",
  },
  /**
   * @description 是否必填，这个是错误提示信息
   */
  required: {
    type: String,
  },
});

export default formItemProp;

export type FormItemExpose = {
  state: FormItemState;
  validate(): Promise<FormItemValidateError | void>;
  inputPublic: ComputedRef<{ name?: string; value?: string }>;
};

export type FormItemProps = ExtractPropTypes<ReturnType<typeof formItemProp>>;
export type FormItemInstance = ComponentPublicInstance<FormItemProps, FormItemExpose>;
