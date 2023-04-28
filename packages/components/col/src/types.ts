import { PropType, ExtractPropTypes } from "vue";

const colProps = () => ({
  /**
   * @description 自定义元素标签
   */
  tag: String as PropType<keyof HTMLElementTagNameMap>,
  /**
   * @description 栅格占据的列数
   */
  span: {
    type: Number,
    default: 24,
  },
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
});

export default colProps;
export type ColProps = ExtractPropTypes<ReturnType<typeof colProps>>;
