import type { ComputedRef, ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";
import { inputUniqueProp } from "@yy/components/input";
import type { Rules, TriggerEventType } from "@yy/tokens";

export interface FormItemState {
  status: "failed" | "passed" | "init";
  message: string;
}

export interface FormItemValidateError {
  name?: string;
  message: string;
}

const formItemProp = mergeCommonProp({
  // input组件参数
  ...inputUniqueProp,
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
});

export default formItemProp;

export type FormItemExpose = {
  validate(): Promise<FormItemValidateError | void>;
  inputPublic: ComputedRef<{ name?: string; value?: string }>;
};

export type FormItemProps = ExtractPropTypes<ReturnType<typeof formItemProp>>;
