import { HTMLAttributes, PropType } from "vue";
import { TriggerType } from "./types";

export type PlacementType =
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";

export const contentProps = () => ({
  /**
   * @description 渲染在哪里
   */
  appendTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: "body",
  },
  /**
   * @description 是否禁止穿梭功能
   */
  teleported: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 动画名称
   */
  transition: {
    type: String,
  },
  /**
   * @description 是否显示
   */
  show: {
    type: Boolean,
  },
  /**
   * @description 下拉框的宽度
   */
  maxWidth: {
    type: [String, Number],
    default: "250px",
  },
  /**
   * @description 触发行为
   */
  trigger: {
    type: String as PropType<TriggerType>,
  },
  /**
   * @description 菜单最大高度
   */
  maxHeight: {
    type: [String, Number],
    default: "250px",
  },
  /**
   * @description 弹框的方向
   */
  placement: {
    type: String as PropType<PlacementType>,
    default: "bottom",
  },
  /**
   * @description 层级
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 提示内容的class
   */
  contentClass: {
    type: [Array, Object, String] as PropType<HTMLAttributes["class"]>,
  },
  /**
   * @description 箭头的class
   */
  arrowClass: {
    type: [Array, Object, String] as PropType<HTMLAttributes["class"]>,
  },
  /**
   * @description 提示内容的style
   */
  contentStyle: {
    type: [Array, Object, String] as PropType<HTMLAttributes["style"]>,
  },
  /**
   * @description 箭头的style
   */
  arrowStyle: {
    type: [Array, Object, String] as PropType<HTMLAttributes["style"]>,
  },
  /**
   * @description 是否隐藏箭头
   */
  hideArrow: {
    type: Boolean,
  },
});
