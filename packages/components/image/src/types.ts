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
});

export default imageProps;

export type ImageProps = ExtractPropTypes<ReturnType<typeof imageProps>>;
