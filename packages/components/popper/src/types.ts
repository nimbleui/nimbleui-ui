import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, HTMLAttributes, PropType } from "vue";

export type PopperAlignment = "start" | "end";
export type PopperSide = "top" | "right" | "bottom" | "left";
export type PopperAlignedPlacement = `${PopperSide}-${PopperAlignment}`;
export type PopperPlacement = PopperSide | PopperAlignedPlacement;

export type PopperTriggerType = "hover" | "click" | "focus" | "manual";

const popperProps = mergeCommonProp({
  /**
   * @description 弹出位置
   */
  placement: {
    type: String as PropType<PopperPlacement>,
    default: "bottom",
  },
  /**
   * @description 触发方式
   */
  trigger: {
    type: String as PropType<PopperTriggerType>,
    default: "click",
  },
  /***
   * @description Tooltip 组件是否禁用
   */
  disabled: {
    type: [Boolean, Function] as PropType<boolean | ((details: any) => boolean)>,
  },
  /**
   * @description 控制显示隐藏
   */
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
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
   * @description 手动控制位置是，top的距离
   */
  top: {
    type: Number,
  },
  /**
   * @description 手动控制位置是，left的距离
   */
  left: {
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
  "onUpdate:modelValue": {
    type: Function as PropType<(value: boolean) => void>,
  },
  /**
   * @description clickOutside 时触发的回调函数
   */
  onOutside: {
    type: Function as PropType<(e: MouseEvent) => void>,
  },
});

export default popperProps;

export type PopperProps = ExtractPropTypes<ReturnType<typeof popperProps>>;
