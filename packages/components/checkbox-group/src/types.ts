import type { PropType, ExtractPropTypes } from "vue";
import { mergeCommonProp, mergeFunctionProp } from "@yy/utils";

type Direction = "horizontal" | "vertical";

type Obj = { [key: string | number]: Array<string | number> };
type Fun = (current: any) => boolean;

const checkboxGroupProps = mergeCommonProp({
  /**
   * @description 排列方向
   */
  direction: {
    type: String as PropType<Direction>,
    default: "vertical",
  },
  /**
   * @description 指定禁用哪一些复选框
   */
  specifyDisabled: {
    type: [Object, Function] as PropType<Obj | Fun>,
  },
  /**
   * @description 是否禁用所有复选框
   */
  disabled: {
    type: Boolean,
  },
  /**
   * @description 最大可选数
   */
  max: {
    type: Number,
  },
});

export default checkboxGroupProps;
export type CheckboxGroupProps = ExtractPropTypes<ReturnType<typeof checkboxGroupProps>>;
