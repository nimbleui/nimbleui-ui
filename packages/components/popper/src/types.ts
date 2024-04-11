import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

export type PopperAlignment = "start" | "end";
export type PopperSide = "top" | "right" | "bottom" | "left";
export type PopperAlignedPlacement = `${PopperSide}-${PopperAlignment}`;
export type PopperPlacement = PopperSide | PopperAlignedPlacement;
export type PopperStrategy = "absolute" | "fixed";

export type PopperRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export interface DOMClientRect extends PopperRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
export type TriggerType = "hover" | "click" | "focus" | "contextmenu";

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
    type: String as PropType<TriggerType>,
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
  "onUpdate:modelValue": {
    type: Function as PropType<(value: boolean) => void>,
  },
});

export default popperProps;

export type PopperProps = ExtractPropTypes<ReturnType<typeof popperProps>>;
