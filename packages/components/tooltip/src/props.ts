import { PropType } from "vue";
import { TriggerType } from "./types";

export const contentProps = () => ({
  /**
   * @description 渲染在哪里
   */
  appendTo: {
    type: String,
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
  selectWidth: {
    type: Number,
  },
  trigger: {
    type: String as PropType<TriggerType>,
  },
  /**
   * @description 菜单最大高度
   */
  maxHeight: {
    type: [String, Number],
  },
  placement: {
    type: String as PropType<"bottom" | "top" | "right" | "left">,
    default: "bottom",
  },
});
