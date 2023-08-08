import type { ExtractPropTypes, ImgHTMLAttributes, PropType } from "vue";
import { mergeCommonProp } from "@yy/utils";

const imageProps = mergeCommonProp({
  /**
   * @description 图片来源
   */
  src: {
    type: String,
  },
  /**
   * @description 预览图片的图片地址
   */
  previewSrc: {
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
    type: String as PropType<"fill" | "contain" | "cover" | "none" | "scale-down">,
    default: "fill",
  },
  /**
   * @description 组件中img元素的属性
   */
  imgProps: {
    type: Object as PropType<ImgHTMLAttributes>,
  },
});

export default imageProps;

export type ImageProps = ExtractPropTypes<ReturnType<typeof imageProps>>;
