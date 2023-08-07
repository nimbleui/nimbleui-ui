import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes } from "vue";

const imageProps = mergeCommonProp({
  /**
   * @description 图片来源
   */
  src: {
    type: String,
  },
  /**
   * @description 是否禁用单击图像预览
   */
  previewDisabled: {
    type: Boolean,
  },
  /**
   * @description 是否让图片进入视口再加载
   */
  lazy: {
    type: Boolean,
  },
  /**
   * @description 图片高度
   */
  height: {
    type: [String, Number],
  },
  /**
   * @description 图片宽度
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description 图片在容器内的的适应类型
   */
  objectFit: {
    type: String,
    default: "fill",
  },
});

export default imageProps;

export type ImageProps = ExtractPropTypes<ReturnType<typeof imageProps>>;
