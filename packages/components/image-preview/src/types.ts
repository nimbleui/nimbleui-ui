import { mergeCommonProp } from "@yy/utils";
import { ExtractPropTypes } from "vue";

const imagePreviewProps = mergeCommonProp({
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

export default imagePreviewProps;

export type imagePreviewExpose = {
  toggle: (bool: boolean) => void;
  setPreviewSrc: (src: string) => void;
};

export type ImagePreviewProps = ExtractPropTypes<ReturnType<typeof imagePreviewProps>>;
