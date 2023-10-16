import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

export type FlexJustify = "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
export type FlexAlign = "flex-start" | "center" | "flex-end";
const flexProps = mergeCommonProp({
  /**
   * @description 自定义元素类型
   */
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "div",
  },
  /**
   * @description 主轴的方向是否垂直
   */
  vertical: {
    type: Boolean,
  },
  /**
   * @description 是否自动换行
   */
  wrap: {
    type: Boolean,
  },
  /**
   * @description 设置元素在主轴方向上的对齐方式
   */
  justify: {
    type: String as PropType<FlexJustify>,
  },
  /**
   * @description 设置元素在交叉轴方向上的对齐方式
   */
  align: {
    type: String as PropType<FlexAlign>,
  },
  /**
   * @description flex CSS 简写属性
   */
  flex: {
    type: String,
  },
  /**
   * @description 设置网格之间的间隙
   */
  gap: {
    type: [Number, String] as PropType<"small" | "middle" | "large" | string | number>,
  },
});

export default flexProps;

export type FlexProps = ExtractPropTypes<ReturnType<typeof flexProps>>;
