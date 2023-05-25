import type { ComputedRef, ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";
import { inputUniqueProp } from "@yy/components";
import type { Rules } from "@yy/tokens";

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
});

export default formItemProp;

export type FormItemExpose = {
  formValue: ComputedRef<unknown>;
};

export type FormItemProps = ExtractPropTypes<ReturnType<typeof formItemProp>>;
