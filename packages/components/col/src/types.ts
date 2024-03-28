import { PropType, ExtractPropTypes } from "vue";

import { mergeCommonProp, mergeFunctionProp } from "@nimble-ui/utils";

export type ColSizeObject = {
  span?: number;
  offset?: number;
  pull?: number;
  push?: number;
};
export type ColSize = number | ColSizeObject;

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
  /**
   * @description 屏幕 < 576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  xs: mergeFunctionProp<ColSize>([Number, Object]),
  /**
   * @description 屏幕 ≥ 576px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  sm: mergeFunctionProp<ColSize>([Number, Object]),
  /**
   * @description 屏幕 ≥ 768px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  md: mergeFunctionProp<ColSize>([Number, Object]),
  /**
   * @description 屏幕 ≥ 992px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  lg: mergeFunctionProp<ColSize>([Number, Object]),
  /**
   * @description 屏幕 ≥ 1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  xl: mergeFunctionProp<ColSize>([Number, Object]),
  /**
   * @description 屏幕 ≥ 1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
   */
  xxl: mergeFunctionProp<ColSize>([Number, Object]),
});

export default colProps;
export type ColProps = ExtractPropTypes<ReturnType<typeof colProps>>;
