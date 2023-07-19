import { CSSProperties, ExtractPropTypes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

const overlayProps = mergeCommonProp({
  show: Boolean,
  zIndex: [Number, String],
  duration: [Number, String],
  lockScroll: {
    type: Boolean,
    default: true,
    customStyle: Object as PropType<CSSProperties>,
  },
  /**
   * @description 禁止穿梭
   */
  disabled: {
    type: Boolean,
  },
});

export default overlayProps;

export type OverlayProps = ExtractPropTypes<ReturnType<typeof overlayProps>>;
