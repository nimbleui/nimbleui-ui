import type { ComponentPublicInstance, ComputedRef, ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";
import type { Rules, TriggerEventType, FormItemState } from "@yy/tokens";

export interface FormItemValidateError {
  name?: string;
  message: string;
}

type LabelAlignType = "row" | "column";

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
   * label标签与输入框的排列方式
   */
  labelAlign: {
    type: String as PropType<LabelAlignType>,
  },
  /**
   * @description 和label原生标签相同能力
   */
  for: String,
});

export default formItemProp;

export type FormItemExpose = {
  state: FormItemState;
  validate(): Promise<FormItemValidateError | void>;
  inputPublic: ComputedRef<{ name?: string; value?: string }>;
};

export type FormItemProps = ExtractPropTypes<ReturnType<typeof formItemProp>>;
export type FormItemInstance = ComponentPublicInstance<FormItemProps, FormItemExpose>;
