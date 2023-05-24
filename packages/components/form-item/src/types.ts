import type { ExtractPropTypes, PropType, VNodeChild } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";

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
});

export default formItemProp;

export type FormItemProps = ExtractPropTypes<ReturnType<typeof formItemProp>>;
