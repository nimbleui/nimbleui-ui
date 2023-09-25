import { ExtractPropTypes, HTMLAttributes, PropType, StyleValue } from "vue";
import { mergeCommonProp } from "@nimble-ui/utils";

const scrollbarProps = mergeCommonProp({
  /**
   * @description 视图的元素标签
   */
  tag: {
    type: String as PropType<keyof HTMLElementTagNameMap>,
    default: "div",
  },
  /**
   * @description 是否使用原生滚动条样式
   */
  native: {
    type: Boolean,
  },
  /**
   * @description 视图的自定义类名
   */
  contentClass: {
    type: [Array, Object, String] as PropType<HTMLAttributes["class"]>,
  },
  /**
   * @description 视图的自定义样式
   */
  contentStyle: {
    type: [Array, Object, String] as PropType<StyleValue>,
  },
  /**
   * @description 是否可以横向滚动
   */
  xScroll: {
    type: Boolean,
  },
  /**
   * @description 显示滚动条的时机，'none' 表示一直显示
   */
  trigger: {
    type: String as PropType<"hover" | "hide" | "none">,
  },
  /**
   * @description 滚动条大小
   */
  size: {
    type: Number,
    default: 5,
  },
});

export default scrollbarProps;
export type ScrollbarProps = ExtractPropTypes<ReturnType<typeof scrollbarProps>>;
