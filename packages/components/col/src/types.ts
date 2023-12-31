import { PropType, ExtractPropTypes } from "vue";

import { mergeCommonProp, mergeFunctionProp } from "@nimble-ui/utils";

const colProps = mergeCommonProp({
  /**
   * @description 自定义元素标签
   */
  tag: String as PropType<keyof HTMLElementTagNameMap>,
  /**
   * @description 栅格占据的列数
   */
  span: mergeFunctionProp<number>(Number),
  /**
   * @description 栅格左侧的间隔格数
   */
  offset: Number,
  /**
   * @description 栅格向右移动格数
   */
  pull: Number,
  /**
   * @description 栅格向左移动格数
   */
  push: Number,
  /**
   * @description 栅格间隔
   */
  gutter: Number,
});

export default colProps;
export type ColProps = ExtractPropTypes<ReturnType<typeof colProps>>;
