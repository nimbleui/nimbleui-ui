import { mergeCommonProp } from "@nimble-ui/utils";
import type { ExtractPropTypes, PropType, VNode } from "vue";

export type SpaceAlign = "start" | "end" | "center" | "baseline";
export type SpaceJustify = "start" | "end" | "center" | "space-around" | "space-between" | "space-evenly";

const spaceProps = mergeCommonProp({
  /**
   * @description 垂直排列方式
   */
  align: {
    type: String as PropType<SpaceAlign>,
  },
  /**
   * @description 间距大小
   */
  size: {
    type: [Number, Array] as PropType<number | [number, number]>,
  },
  /**
   * @description 是否垂直布局
   */
  vertical: Boolean,
  /**
   * @description 是否超出换行
   */
  wrap: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 间隔符
   */
  split: {
    type: [String, Object] as PropType<string | VNode>,
  },
  /**
   * @description 是否为行内元素
   */
  inline: {
    type: Boolean,
  },
  /**
   * @description 水平排列方式
   */
  justify: {
    type: String as PropType<SpaceJustify>,
    default: "start",
  },
});

export default spaceProps;

export type SpaceProps = ExtractPropTypes<ReturnType<typeof spaceProps>>;
