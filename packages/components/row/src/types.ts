import { PropType, ExtractPropTypes } from "vue";

export type Action = "confirm" | "cancel" | "close";

const rowProps = () => ({
  // 栅格间隔
  gutter: Number,
  // 自定义元素标签
  tag: String as PropType<keyof HTMLElementTagNameMap>,
  // flex 布局下的垂直排列方式
  align: String as PropType<"top" | "middle" | "bottom">,
  // flex 布局下的水平排列方式
  justify: String as PropType<"start" | "end" | "center" | "space-around" | "space-between" | "space-evenly">,
});

export default rowProps;
export type RowProps = ExtractPropTypes<ReturnType<typeof rowProps>>;
