import { mergeCommonProp } from "@nimble-ui/utils";
import { ExtractPropTypes, PropType } from "vue";

const backTopProps = mergeCommonProp({
  /**
   * @description 距离页面底部的高度
   */
  bottom: {
    type: [Number, String],
    default: 40,
  },
  /**
   * @description 距离页面右侧的宽度
   */
  right: {
    type: [Number, String],
    default: 40,
  },
  /**
   * @description 监听滚动的元素，如果为 undefined 会监听距离最近的一个可滚动的祖先节点
   */
  listenTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
  },
  /**
   * @description 渲染的容器节点
   */
  mount: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: "body",
  },
  scrollTop: {
    type: Number,
    default: 180,
  },
});

export default backTopProps;

export type BackTopProps = ExtractPropTypes<ReturnType<typeof backTopProps>>;
