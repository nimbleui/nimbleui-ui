import { PropType, ExtractPropTypes } from "vue";

export type RowAlign = "top" | "middle" | "bottom";
export type RowJustify = "start" | "center" | "end" | "space-around" | "space-between" | "space-evenly";

const rowProps = () => ({
  /**
   * @description 栅格间隔
   */
  gutter: Number,
  /**
   * @description 自定义元素标签
   */
  tag: String as PropType<keyof HTMLElementTagNameMap>,
  /**
   * @description flex 布局下的垂直排列方式
   */
  align: {
    type: String as PropType<RowAlign>,
    default: "top",
  },
  /**
   * @description flex 布局下的水平排列方式
   */
  justify: {
    type: String as PropType<RowJustify>,
    default: "start",
  },
});

export default rowProps;
export type RowProps = ExtractPropTypes<ReturnType<typeof rowProps>>;
