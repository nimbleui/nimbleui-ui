import { PropType, ExtractPropTypes } from "vue";

export const RowAlign = ["top", "middle", "bottom"] as const;
export const RowJustify = ["start", "center", "end", "space-around", "space-between", "space-evenly"] as const;

const rowProps = () => ({
  // 栅格间隔
  gutter: Number,
  // 自定义元素标签
  tag: String as PropType<keyof HTMLElementTagNameMap>,
  // flex 布局下的垂直排列方式
  align: {
    type: String,
    values: RowAlign,
    default: "top",
  },
  // flex 布局下的水平排列方式
  justify: {
    type: String,
    values: RowJustify,
    default: "start",
  },
});

export default rowProps;
export type RowProps = ExtractPropTypes<ReturnType<typeof rowProps>>;
