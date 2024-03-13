import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

const badgeProps = mergeCommonProp({
  /**
   * @description 自定义小圆点的颜色
   */
  color: {
    type: String,
  },
  /**
   * @description 标记数量
   */
  count: {
    type: [String, Number],
  },
  /**
   * @description 不展示数字，只有一个小红点
   */
  dot: {
    type: Boolean,
  },
  /**
   * @description 设置状态点的位置偏移
   */
  offset: {
    type: Array as unknown as PropType<[number, number]>,
  },
  /**
   * @description 展示的最大值
   */
  max: {
    type: Number,
  },
  /**
   * @description 为 0 时是否显示
   */
  showZero: {
    type: Boolean,
  },
  /**
   * @description 是否隐藏
   */
  hide: {
    type: Boolean,
  },
  /**
   * @description 类型
   */
  type: {
    type: String as PropType<"success" | "error" | "warning" | "info">,
    default: "error",
  },
});

export default badgeProps;

export type BadgeProps = ExtractPropTypes<ReturnType<typeof badgeProps>>;
